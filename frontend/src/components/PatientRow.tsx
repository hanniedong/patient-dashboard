import { Patient } from '@/types/patient.interface';
import React, { useState } from 'react';
import PatientFormDrawer from './PatientForm';

interface Props {
	patient: Patient;
	hiddenColumns: string[];
	columns: string[];
}

const PatientRow: React.FC<Props> = ({ patient, hiddenColumns, columns }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const handleClick = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	// Format date of birth to MM-DD-YYYY
	const formattedDateOfBirth = new Date(patient.dateOfBirth).toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}
	);

	const renderStatusPill = () => {
		let pillColor = '';
		switch (patient.status) {
			case 'Inquiry':
				pillColor = 'bg-blue-500';
				break;
			case 'Onboarding':
				pillColor = 'bg-yellow-500';
				break;
			case 'Active':
				pillColor = 'bg-green-500';
				break;
			case 'Churned':
				pillColor = 'bg-red-500';
				break;
			default:
				pillColor = 'bg-gray-500';
		}

		return (
			<span className={`px-2 py-1 rounded-full text-white ${pillColor}`}>
				{patient.status}
			</span>
		);
	};

	const renderColumn = (columnName: string) => {
		if (hiddenColumns.includes(columnName)) {
			return null; // Don't render the column if it's hidden
		}
		const { street, city, state, zipCode, additionalAddress } = patient;

		switch (columnName) {
			case 'firstName':
			case 'middleName':
			case 'lastName':
				return <td className='p-6'>{patient[columnName]}</td>;
			case 'primaryAddress':
				return street && city && state && zipCode ? (
					<td className='p-6'>
						{patient.street}, {patient.city}, {patient.state}, {patient.zipCode}
					</td>
				) : (
					<td></td>
				);
			case 'status':
				return <td className='p-6'>{renderStatusPill()}</td>;
			case 'additionalAddress':
				return additionalAddress?.street ? (
					<td className='p-6'>
						{additionalAddress.street}, {additionalAddress.city}, 
						{additionalAddress.state} 
						{additionalAddress.zipCode}
					</td>
				) : (
					<td className='p-6'></td>
				);
			case 'dateOfBirth':
				return <td className='p-6'>{formattedDateOfBirth}</td>;

			default:
				if (patient.customFields) {
					//@ts-ignore
					const customFieldValue = patient.customFields[columnName];
					if (customFieldValue) {
						return <td className='p-6'>{customFieldValue}</td>;
					} else {
						return <td className='p-6'></td>;
					}
				}
				return <td className='p-6'></td>;
		}
	};
	return (
		<>
			{isDrawerOpen && <PatientFormDrawer isEdit patient={patient} />}
			<tr onClick={handleClick}>
				{columns.map((column) => (
					<React.Fragment key={column}>{renderColumn(column)}</React.Fragment>
				))}
			</tr>
		</>
	);
};

export default PatientRow;
