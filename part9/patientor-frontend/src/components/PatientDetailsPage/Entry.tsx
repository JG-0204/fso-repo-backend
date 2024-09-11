import { Box } from '@mui/material';
import {
  Favorite,
  LocalHospital,
  MedicalServices,
  Work,
} from '@mui/icons-material';

import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';

const EntryCard = ({ entry }: { entry: Entry }) => {
  const displayEntries = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckEntryCard entry={entry} />;
      case 'Hospital':
        return <HospitalEntryCard entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryCard entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return displayEntries(entry);
};

const HealthCheckEntryCard = ({ entry }: { entry: HealthCheckEntry }) => {
  const displayHealthCheckRating = (rating: number) => {
    switch (rating) {
      case 0:
        return <Favorite sx={{ color: 'green' }} />;
      case 1:
        return <Favorite sx={{ color: 'yellow' }} />;
      case 2:
        return <Favorite sx={{ color: 'blue' }} />;
      case 3:
        return <Favorite sx={{ color: 'red' }} />;
      default:
        break;
    }
  };

  return (
    <Box sx={{ border: '1px solid', borderRadius: '5px' }}>
      <div>
        {entry.date} <MedicalServices fontSize="large" />
      </div>
      <em>{entry.description}</em>
      <div>{displayHealthCheckRating(entry.healthCheckRating)}</div>
      <div>diagnose by: {entry.specialist}</div>
    </Box>
  );
};

const HospitalEntryCard = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box sx={{ border: '1px solid', borderRadius: '5px' }}>
      <div>
        {entry.date} <LocalHospital fontSize="large" />
      </div>
      <em>{entry.description}</em>
      <div>
        <p>
          discharge info: date: {entry.discharge.date}, criteria:
          <em>{entry.discharge.criteria}</em>
        </p>
      </div>
      <div>diagnose by: {entry.specialist}</div>
    </Box>
  );
};

const OccupationalHealthcareEntryCard = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box sx={{ border: '1px solid', borderRadius: '5px' }}>
      <div>
        {entry.date} <Work fontSize="large" />
        {entry.employerName}
      </div>
      <em>{entry.description}</em>
      {entry.sickLeave && (
        <div>
          <span>sick leave duration: </span>
          <em>
            {entry.sickLeave.startDate}-{entry.sickLeave.endDate}
          </em>
        </div>
      )}

      <div>diagnose by: {entry.specialist}</div>
    </Box>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryCard;
