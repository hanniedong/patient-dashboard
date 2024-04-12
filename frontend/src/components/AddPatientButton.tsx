import React, { useState } from 'react';
import PatientForm from './PatientForm';

const AddPatient: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<div className='overflow-x-auto'>
			<button
				onClick={handleDrawerToggle}
				className='bg-blue-500 text-white px-4 py-2 rounded shadow ml-4'
			>
				Add Patient
			</button>
			{isDrawerOpen && <PatientForm />}
    </div>
	);
};
export default AddPatient;
