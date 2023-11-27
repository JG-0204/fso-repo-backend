const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const express = require('express');
const Person = require('./models/person');
const app = express();

app.use(express.json());

const morgan = require('morgan');

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan('tiny'),
  morgan(function (tokens, req, res) {
    return tokens.body(req, res);
  }),
);

const cors = require('cors');

app.use(cors());

app.use(express.static('dist'));

app.get('/api/persons/', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/info', async (request, response) => {
  const currentTime = new Date();
  const length = await Person.estimatedDocumentCount({});

  response.send(
    `<p>Phonebook has info for ${length} people, <br /> <p>${currentTime}</p></p>`,
  );
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.send(person);
      } else {
        response.sendStatus(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      return next(error);
    });
});

const respond400 = (response, message) => {
  return response.status(400).json({
    error: message,
  });
};

app.post('/api/persons', async (request, response, next) => {
  const body = request.body;

  if (body.name === '') return respond400(response, 'name is missing');

  if (body.number === '') return respond400(response, 'number is missing');

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    body.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
