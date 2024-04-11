import React, { useState, useEffect, useMemo } from 'react';
import PatientRow from './PatientRow';
import patientService from '../services/patientService';
import { Patient } from '@/types/patient.interface';
import PatientFormDrawer from './PatientFormDrawer';
import { usePatientsContext } from '@/context/PatientContext';
import Search from './Search';

const PatientList: React.FC = () => {
  const { patients, setPatients } = usePatientsContext();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await patientService.getAllPatients();
				setPatients(data);
			} catch (error) {
				console.error('Error fetching patient data:', error);
			}
		};

		fetchData();
	}, []);

	const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

	const handleColumnToggle = (columnName: string) => {
		if (hiddenColumns.includes(columnName)) {
			setHiddenColumns(hiddenColumns.filter((col) => col !== columnName));
		} else {
			setHiddenColumns([...hiddenColumns, columnName]);
		}
	};

  const handleSearch = async (searchQuery: {
    firstName: string;
    lastName: string;
    status: string;
  }) => {
    try {
      const data = await patientService.getAllPatients(searchQuery);
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

	const cachedPatients = useMemo(() => patients, [patients]);


	const columnNames = [
		'firstName',
		'middleName',
		'lastName',
		'status',
		'primaryAddress',
		'additionalAddresses',
		'dateOfBirth',
	]; // Add more column names as needed

	return (
		<div className='overflow-x-auto'>
			<button
				onClick={handleDrawerToggle}
				className='bg-blue-500 text-white px-4 py-2 rounded shadow ml-4'
			>
				Add Patient
			</button>
			{isDrawerOpen && <PatientFormDrawer />}
      <Search onSearch={handleSearch}/>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						{columnNames.map((columnName) => (
							<th
								key={columnName}
								scope='col'
								className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
									hiddenColumns.includes(columnName) ? 'hidden' : ''
								}`}
							>
								{columnName.charAt(0).toUpperCase() + columnName.slice(1)}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{cachedPatients.map((patient) => (
						<PatientRow
							key={patient._id}
							patient={patient}
							hiddenColumns={hiddenColumns}
						/>
					))}
				</tbody>
			</table>
			<div className='mt-4'>
				<span className='mr-2'>Hide Columns:</span>
				{columnNames.map((columnName) => (
					<button
						key={columnName}
						className={`border border-gray-300 rounded-md px-2 ${
							hiddenColumns.includes(columnName)
								? 'bg-red-500 text-white'
								: 'bg-gray-200'
						}`}
						onClick={() => handleColumnToggle(columnName)}
					>
						{columnName.charAt(0).toUpperCase() + columnName.slice(1)}
					</button>
				))}
			</div>
		</div>
	);
};
export default PatientList;
