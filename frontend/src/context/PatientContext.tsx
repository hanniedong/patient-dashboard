import { Patient } from '@/types/patient.interface';
import React, { createContext, useContext, useState } from 'react';

// Define the patient context
type PatientsContextType = {
  patients: Patient[]; // Define the type of patients data
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>; // Function to update patients
};

// Create the context
const PatientsContext = createContext<PatientsContextType | undefined>(undefined);

// Create a custom hook to use the context
export const usePatientsContext = () => {
  const context = useContext(PatientsContext);
  if (!context) {
    throw new Error('usePatientsContext must be used within a PatientsProvider');
  }
  return context;
};

// Create the provider component
export const PatientsProvider: React.FC = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]); // Initialize patients state

  return (
    <PatientsContext.Provider value={{ patients, setPatients }}>
      {children}
    </PatientsContext.Provider>
  );
};