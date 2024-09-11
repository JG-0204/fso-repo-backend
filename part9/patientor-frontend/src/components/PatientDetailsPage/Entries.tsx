import { Box, Typography } from '@mui/material';
import { Entry } from '../../types';

const Entries = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      <Box>
        <Typography variant="h5">Patient Entries</Typography>
      </Box>
      {Object.values(entries).map((entry: Entry) => (
        <div key={entry.id}>
          <p>
            {entry.date} <em>{entry.description}</em>
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Entries;
