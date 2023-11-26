require('dotenv').config();
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

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
    .catch((error) => {
      errorHandler(error, request, response, next);
    });
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

const checkIfNameExist = (name) => {
  const person = persons.find(
    (person) => person.name.toLowerCase() === name.toLowerCase(),
  );
  return person ? true : false;
};

const respond400 = (response, message) => {
  return response.status(400).json({
    error: message,
  });
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (body.name === '') return respond400(response, 'name is missing');

  if (body.number === '') return respond400(response, 'number is missing');

  if (checkIfNameExist(body.name))
    return respond400(response, 'name must be unique');

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(body.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
