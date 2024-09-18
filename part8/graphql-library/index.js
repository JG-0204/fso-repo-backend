const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

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
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
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
    bookCount: (root) => {
      const byAuthor = (book) => book.author === root.name;
      return books.filter(byAuthor).length;
    },
  },

  Query: {
    booksCount: (root) => books.length,
    authorsCount: (root) => authors.length,
    allBooks: (root, args) => {
      const byAuthor = (book) => book.author === args.author;
      const byGenre = (book) => book.genres.includes(args.genre);

      if (args.genre && args.author) {
        const authorBooks = books.filter(byAuthor);
        return authorBooks.filter(byGenre);
      } else if (args.genre) {
        return books.filter(byGenre);
      } else if (args.author) {
        return books.filter(byAuthor);
      } else {
        return books;
      }
    },
    allAuthors: (root) => authors,
  },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author }).exec();

      if (!author) {
        const newAuthor = new Author({ name: args.author });

        newAuthor.save();

        const book = new Book({
          ...args,
          author: {
            _id: newAuthor._id,
          },
        });
        book.save();
        return book;
      }

      const book = new Book({
        ...args,
        author: {
          _id: author._id,
        },
      });
      book.save();
      return book;
    },

    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);

      if (!author) return null;

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) =>
        a.id !== updatedAuthor.id ? a : updatedAuthor
      );
      return updatedAuthor;
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
