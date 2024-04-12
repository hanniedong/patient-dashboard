import React from 'react';
import { PatientsProvider } from '@/context/PatientContext';
import Header from '@/components/common/Header';
import { ProviderCustomFieldsProvider } from '@/context/ProviderCustomFieldsContext';
import '../app/globals.css';
import PatientList from '../components/PatientList'; 

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
