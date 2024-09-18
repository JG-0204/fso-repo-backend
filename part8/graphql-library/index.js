const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');

const { v1: uuid } = require('uuid');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const config = require('./utils/config');
const Author = require('./models/author');
const Book = require('./models/book');

const connectToDB = () => {
  console.log('connecting to ' + config.MONGODB_URI);

  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log('connected to db');
    })
    .catch((e) => {
      console.log('Something went wrong ' + e.message);
    });
};

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
  },
  {
    name: 'Sandi Metz', // birthyear not known
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String]
        id: ID!
    }

    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int!
    }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ) : Book
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const authorBooks = await Book.find({ author: root._id }).exec();
      return authorBooks.length;
    },
  },

  Query: {
    booksCount: async (_root) => await Book.collection.estimatedDocumentCount(),
    authorsCount: async (_root) =>
      await Author.collection.estimatedDocumentCount(),
    allBooks: async (_root, args) => {
      const books = await Book.find({}).populate('author', { name: 1, id: 1 });
      const argsIsEmpty = Object.keys(args).length === 0;

      if (argsIsEmpty) return books;

      const author = await Author.findOne({ name: args.author }).exec();

      const byAuthor = (book) => book.author.equals(author._id);
      const byGenre = (book) => book.genres.includes(args.genre);

      if (args.genre && args.author) {
        const authorBooks = books.filter(byAuthor);
        return authorBooks.filter(byGenre);
      }
      if (args.genre) return books.filter(byGenre);
      if (args.author) return books.filter(byAuthor);
    },
    allAuthors: async (_root) => {
      const authors = await Author.find({});
      return authors;
    },
  },

  Mutation: {
    addBook: async (_root, args) => {
      const author = await Author.findOne({ name: args.author }).exec();

      if (!author) {
        const newAuthor = new Author({ name: args.author });

        const book = new Book({
          ...args,
          author: {
            _id: newAuthor._id,
          },
        });

        try {
          await newAuthor.save();
          await book.save();
        } catch (error) {
          throw new GraphQLError(error._message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              error,
            },
          });
        }

        return book;
      }

      const book = new Book({
        ...args,
        author: {
          _id: author._id,
        },
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error._message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      return book;
    },

    editAuthor: async (_root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('Author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      author.born = args.setBornTo;
      await author.save();

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

connectToDB();

// const addToDb = async () => {
//   await Author.deleteMany({});
//   await Book.deleteMany({});
//   await Author.insertMany(authors);
// };
// addToDb();
