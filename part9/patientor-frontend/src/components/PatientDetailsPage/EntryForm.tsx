import {
  Box,
  TextField,
  Button,
  Alert,
  Tabs,
  Tab,
  Divider,
  Input,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { Entry, NewEntry } from '../../types';

import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';

interface EntryFormProps {
  render: (entry: Entry) => void;
  codes: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const HealthCheckEntryForm = ({
  codes,
  patientID,
  render,
  setError,
}: {
  codes: string[];
  patientID: string;
  render: (entry: Entry) => void;
  setError: Dispatch<SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const resetValues = (): void => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(0);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const { target } = event;

    setDiagnosisCodes(
      typeof target.value === 'string' ? target.value.split(',') : target.value
    );
  };

  const handleHealthCheckRatingSelect = (
    event: SelectChangeEvent<typeof healthCheckRating>
  ) => {
    const { target } = event;

    setHealthCheckRating(target.value as number);
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: NewEntry = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      // healthCheckRating: Number(healthCheckRating),
    };

    try {
      const newEntry = await patientService.addPatientEntry(patientID, entry);

      render(newEntry as Entry);
      resetValues();
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />

      <span>Date</span>
      <Input
        fullWidth
        type="date"
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
      <FormControl sx={{ m: 1, width: 1 }}>
        <InputLabel>Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          input={<OutlinedInput label="Codes" />}
          MenuProps={MenuProps}
          onChange={handleSelectChange}
        >
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel>HealthCheck Rating</InputLabel>
        <Select
          onChange={handleHealthCheckRatingSelect}
          value={healthCheckRating}
          input={<OutlinedInput label="HealthCheck Rating" />}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>

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
  );
};

const HospitalEntryForm = ({
  codes,
  patientID,
  render,
  setError,
}: {
  codes: string[];
  patientID: string;
  render: (entry: Entry) => void;
  setError: Dispatch<SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const resetValues = (): void => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const handleSelectChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const { target } = event;

    setDiagnosisCodes(
      typeof target.value === 'string' ? target.value.split(',') : target.value
    );
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: NewEntry = {
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };

    try {
      const newEntry = await patientService.addPatientEntry(patientID, entry);

      render(newEntry as Entry);
      resetValues();
      setError('');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <span>Date</span>
      <Input
        fullWidth
        type="date"
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
      <FormControl sx={{ m: 1, width: 1 }}>
        <InputLabel>Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          input={<OutlinedInput label="Codes" />}
          MenuProps={MenuProps}
          onChange={handleSelectChange}
        >
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider
        sx={{ marginTop: '2rem', marginBottom: '1rem' }}
        textAlign="left"
      >
        Discharge Info
      </Divider>
      <span>Date</span>
      <Input
        fullWidth
        type="date"
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Discharge Criteria"
        variant="standard"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
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
  );
};

const OccupationalHealthcareEntry = ({
  codes,
  patientID,
  render,
  setError,
}: {
  codes: string[];
  patientID: string;
  render: (entry: Entry) => void;
  setError: Dispatch<SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [employer, setEmployer] = useState<string>('');
  // sick leave
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const resetValues = (): void => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setEmployer('');
    setStartDate('');
    setEndDate('');
  };

  const handleSelectChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const { target } = event;

    setDiagnosisCodes(
      typeof target.value === 'string' ? target.value.split(',') : target.value
    );
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: NewEntry = {
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName: employer,
      sickLeave: {
        startDate,
        endDate,
      },
    };

    try {
      const newEntry = await patientService.addPatientEntry(patientID, entry);

      render(newEntry as Entry);
      setError('');
      resetValues();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <span>Date</span>
      <Input
        fullWidth
        type="date"
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
      <FormControl sx={{ m: 1, width: 1 }}>
        <InputLabel>Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          input={<OutlinedInput label="Codes" />}
          MenuProps={MenuProps}
          onChange={handleSelectChange}
        >
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Employer Name"
        variant="standard"
        fullWidth
        value={employer}
        onChange={({ target }) => setEmployer(target.value)}
      />
      <Divider
        sx={{ marginTop: '2rem', marginBottom: '1rem' }}
        textAlign="left"
      >
        Sick Leave
      </Divider>
      <span>Start Date</span>
      <Input
        fullWidth
        type="date"
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <span>End Date</span>
      <Input
        fullWidth
        type="date"
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
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
  );
};

const EntryForm = ({ render, codes }: EntryFormProps) => {
  const { id } = useParams();

  const [entryFormIndex, setEntryFormIndex] = useState<number>(0);

  const [error, setError] = useState<string>('');

  const changeEntryForm = (_event: SyntheticEvent, index: number) => {
    setEntryFormIndex(index);
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ border: '2px dotted', paddingInline: '5px' }}>
        <Tabs
          value={entryFormIndex}
          onChange={changeEntryForm}
          variant="fullWidth"
          centered
        >
          <Tab label="Health Check" />
          <Tab label="Hospital" />
          <Tab label="Occupational Healthcare" />
        </Tabs>
        <CustomTabPanel value={entryFormIndex} index={0}>
          <HealthCheckEntryForm
            codes={codes}
            render={render}
            setError={setError}
            patientID={id as string}
          />
        </CustomTabPanel>
        <CustomTabPanel value={entryFormIndex} index={1}>
          <HospitalEntryForm
            codes={codes}
            render={render}
            setError={setError}
            patientID={id as string}
          />
        </CustomTabPanel>
        <CustomTabPanel value={entryFormIndex} index={2}>
          <OccupationalHealthcareEntry
            codes={codes}
            render={render}
            setError={setError}
            patientID={id as string}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default EntryForm;
