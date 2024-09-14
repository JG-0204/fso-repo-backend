import { Stack, Box, Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types';

import EntryCard from './Entry';
import EntryForm from './EntryForm';

import { useState } from 'react';

interface EntriesProps {
  initialEntries: Entry[];
  diagnoses: Diagnosis[];
}

const Entries = ({ initialEntries, diagnoses }: EntriesProps) => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  // // const [error, setError] = useState<string>('');

  // const { id } = useParams();

  const addNewEntry = (entry: Entry) => {
    if (entry) setEntries((entries) => entries.concat(entry));
  };

  // const getDiagnosisCodeName = (code: string) => {
  //   const currCode = diagnoses.find((c) => c.code === code);

  //   return currCode?.name;
  // };

  return (
    <div>
      {/* {error && <Alert severity="error">{error}</Alert>} */}
      <EntryForm add={addNewEntry} />
      <Box>
        <Typography variant="h5">Patient Entries</Typography>
      </Box>
      <Stack spacing={2}>
        {Object.values(entries).map((entry: Entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </Stack>
    </div>
  );
};

export default Entries;
