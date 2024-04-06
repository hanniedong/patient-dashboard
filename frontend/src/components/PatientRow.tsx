import { Patient } from '@/types/patient.interface';
import React, { Dispatch, useState } from 'react';
import PatientFormDrawer from './PatientFormDrawer';

interface Props {
	patient: Patient;
	hiddenColumns: string[];
}

const PatientRow: React.FC<Props> = ({ patient, hiddenColumns }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleClick = () => {
		console.log('HIT');
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

		switch (columnName) {
			case 'firstName':
				return <td>{patient.firstName}</td>;
			case 'middleName':
				return <td>{patient.middleName}</td>;
			case 'lastName':
				return <td>{patient.lastName}</td>;
			case 'status':
				return <td>{renderStatusPill()}</td>;
			case 'primaryAddress':
				return <td>{patient.primaryAddress}</td>;
			case 'additionalAddresses':
				return <td>{patient.additionalAddresses.join(', ')}</td>;
			case 'dateOfBirth':
				return <td>{formattedDateOfBirth}</td>;
			default:
				return null;
		}
	};

	return (
		<>
			{isDrawerOpen && <PatientFormDrawer isEdit patient={patient} />}
			<tr onClick={handleClick}>
				{[
					'firstName',
					'middleName',
					'lastName',
					'status',
					'primaryAddress',
					'additionalAddresses',
					'dateOfBirth',
				].map((columnName) => (
					<React.Fragment key={columnName}>
						{renderColumn(columnName)}
					</React.Fragment>
				))}
			</tr>
		</>
	);
};

export default PatientRow;
