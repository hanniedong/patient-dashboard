import React from 'react';
import PatientList from '../components/PatientList'; // Assuming you have a PatientList component
import '../app/globals.css';
import { PatientsProvider } from '@/context/PatientContext';
import Header from '@/components/Header';
import { ProviderCustomFieldsProvider } from '@/context/ProviderCustomFieldsContext';

const Dashboard: React.FC = () => {
	return (
		<div className='bg-white shadow-md rounded-md overflow-hidden'>
			<div className='p-4'>
				<ProviderCustomFieldsProvider>
					<PatientsProvider>
						<Header />
						<PatientList />
					</PatientsProvider>
				</ProviderCustomFieldsProvider>
			</div>
		</div>
	);
};

export default Dashboard;
