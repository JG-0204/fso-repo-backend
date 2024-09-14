import { Box, TextField, Button, Alert } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Entry, NewEntry } from '../../types';

import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';

interface EntryFormProps {
  add: (entry: Entry) => void;
}

const EntryForm = ({ add }: EntryFormProps) => {
  const { id } = useParams();

  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

  const [error, setError] = useState<string>('');

  const resetValues = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes('');
    setError('');
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = {
        type: 'HealthCheck',
        description,
        date,
        specialist,
        healthCheckRating: Number(healthCheckRating),
        diagnosisCodes: diagnosisCodes.split(', '),
      };

      const entry = await patientService.addPatientEntry(
        id as string,
        newEntry as NewEntry
      );
      add(entry as Entry);
      resetValues();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ border: '2px dotted', paddingInline: '5px' }}>
        <form onSubmit={handleSubmit}>
          <h4>New HealthCheck Entry</h4>
          <TextField
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            variant="standard"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            variant="standard"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="Healthcheck Rating"
            variant="standard"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
          <TextField
            label="Diagnosis Code"
            variant="standard"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
          <div
            style={{
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Button variant="contained" onClick={() => resetValues()}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default EntryForm;
