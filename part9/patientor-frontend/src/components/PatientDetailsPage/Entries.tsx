import { Stack, Box, Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types';

import EntryCard from './Entry';

interface EntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const Entries = ({ entries, diagnoses }: EntriesProps) => {
  // const getDiagnosisCodeName = (code: string) => {
  //   const currCode = diagnoses.find((c) => c.code === code);

  //   return currCode?.name;
  // };

  return (
    <div>
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
