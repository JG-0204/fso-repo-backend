import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Male, Female, Transgender } from '@mui/icons-material';

import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Diagnosis, Patient } from '../../types';

import Entries from './Entries';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      const data = await patientService.getPatient(id as string);
      setPatient(data);
    };

    const fetchDiagnoses = async () => {
      const data = await diagnosisService.getAll();

      setDiagnoses(data);
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {patient?.name}
          {patient?.gender === 'male' ? (
            <Male fontSize="large" />
          ) : patient?.gender === 'female' ? (
            <Female fontSize="large" />
          ) : (
            <Transgender fontSize="large" />
          )}
        </Typography>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Entries entries={patient.entries} diagnoses={diagnoses} />
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
