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

  const diagnosesCodes = diagnoses.map((diagnosis) => diagnosis.code);

  const updateEntries = (entry: Entry) => {
    if (entry) setEntries((entries) => entries.concat(entry));
  };

  return (
    <div>
      <EntryForm render={updateEntries} codes={diagnosesCodes} />
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
