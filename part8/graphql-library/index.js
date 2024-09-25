const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');

const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const express = require('express');
const cors = require('cors');
const http = require('http');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const jwt = require('jsonwebtoken');

const config = require('./utils/config');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
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

    createUser(
    username: String!
    favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
      ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    booksCount: async (_root) => await Book.collection.estimatedDocumentCount(),
    authorsCount: async (_root) =>
      await Author.collection.estimatedDocumentCount(),
    allBooks: async (_root, args) => {
      const books = await Book.find({}).populate('author');
      const argsIsEmpty = Object.keys(args).length === 0;

      if (argsIsEmpty) return books;

      const author = await Author.findOne({ name: args.author });

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
    me: (_root, _args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('user not logged-in', {
          extensions: {
            code: 'FORBIDDEN',
          },
        });
      }

      return currentUser;
    },
  },

  Mutation: {
    addBook: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('User is not authenticated', {
          extensions: 'BAD_USER_INPUT',
        });
      }

      const author = await Author.findOne({ name: args.author });

      if (!author) {
        const newAuthor = new Author({ name: args.author });
        newAuthor.bookCount = 1;

        const book = new Book({
          ...args,
          author: newAuthor._id,
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

        const bookObj = await Book.findById(book._id).populate('author');
        pubsub.publish('BOOK_ADDED', { bookAdded: bookObj });
        return bookObj;
      }

      const book = new Book({
        ...args,
        author: author._id,
      });

      await Author.updateOne(
        { name: author.name },
        {
          bookCount: (author.bookCount += 1),
        }
      );

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

      const bookObj = await Book.findById(book._id).populate('author');
      pubsub.publish('BOOK_ADDED', { bookAdded: bookObj });

      return bookObj;
    },

    editAuthor: async (_root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('User is not authenticated', {
          extensions: 'BAD_USER_INPUT',
        });
      }

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

    createUser: async (_root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError(error._message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      }

      return user;
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user) {
        throw new GraphQLError('User does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          },
        });
      }

      if (args.password !== 'admin') {
        throw new GraphQLError('Invalid password', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.password,
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.JWT_KEY);
      return { value: token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

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

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), config.JWT_KEY);
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  httpServer.listen(config.PORT, () => {
    console.log(`server running on http://localhost:${config.PORT}`);
  });

  connectToDB();
};

start();

// let authors = [
//   {
//     name: 'Robert Martin',
//     born: 1952,
//     bookCount: 0,
//   },
//   {
//     name: 'Martin Fowler',
//     born: 1963,
//     bookCount: 0,
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     born: 1821,
//     bookCount: 0,
//   },
//   {
//     name: 'Joshua Kerievsky',
//     bookCount: 0,
//     birthyear not known
//   },
//   {
//     name: 'Sandi Metz',
//     bookCount: 0,
//     birthyear not known
//   },
// ];

// const addToDb = async () => {
//   await Author.deleteMany({});
//   await Book.deleteMany({});
//   await Author.insertMany(authors);
// };
// addToDb();
