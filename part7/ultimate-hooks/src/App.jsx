import { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(baseUrl);
      setResources(res.data);
    };

    fetch();
  }, [baseUrl]);

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);
    setResources((prevResources) => [...prevResources, res.data]); // Add the new item
    return res.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const excludeReset = ({ reset, ...newProp }) => newProp;

  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const contentWithoutReset = excludeReset(content);
  const nameWithoutReset = excludeReset(name);
  const numberWithoutReset = excludeReset(number);

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();

    noteService.create({ content: contentWithoutReset.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: nameWithoutReset.value,
      number: numberWithoutReset.value,
    });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input name="note" {...contentWithoutReset} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameWithoutReset} /> <br />
        number <input {...numberWithoutReset} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
