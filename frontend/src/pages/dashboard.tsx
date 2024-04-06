import React from 'react';
import PatientList from '../components/PatientList'; // Assuming you have a PatientList component
import "../app/globals.css";
import { PatientsProvider } from '@/context/PatientContext';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="px-4 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Patient Dashboard</h2>
      </div>
      <div className="p-4">
        <PatientsProvider>
          <PatientList />
        </PatientsProvider>
      </div>
    </div>
  );
};

export default Dashboard;