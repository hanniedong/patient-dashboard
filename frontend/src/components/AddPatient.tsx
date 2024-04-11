import React, { useState } from 'react';
import PatientFormDrawer from './PatientFormDrawer';

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
			{isDrawerOpen && <PatientFormDrawer />}
    </div>
	);
};
export default AddPatient;
