const express = require('express');
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

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons/', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const length = persons.length;
  const currentTime = new Date();

  response.send(
    `<p>Phonebook has info for ${length} people, <br /> <p>${currentTime}</p></p>`,
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    response.send(person);
  } else {
    response.statusMessage = 'ID does not exist';
    response.sendStatus(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 999999);
};

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

  if (!body.name) respond400(response, 'name is missing');

  if (!body.number) respond400(response, 'number is missing');

  if (checkIfNameExist(body.name)) respond400(response, 'name must be unique');

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
