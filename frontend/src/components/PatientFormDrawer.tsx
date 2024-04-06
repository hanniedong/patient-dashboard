import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import patientService from '@/services/patientService';
import { usePatientsContext } from '@/context/PatientContext';
import XIcon from '@/assets/icons/XIcon';
import { Patient } from '@/types/patient.interface';

interface Props {
	patient?: Patient;
	isEdit?: Boolean;
}
const PatientFormDrawer: React.FC<Props> = ({ isEdit, patient }) => {
	const { patients, setPatients } = usePatientsContext();
	const [formData, setFormData] = useState({
		id: patient?._id || '',
		firstName: patient?.firstName || '',
		middleName: patient?.middleName || '',
		lastName: patient?.lastName || '',
		status: patient?.status || 'Inquiry',
		primaryAddress: patient?.primaryAddress || '',
		additionalAddresses: patient?.additionalAddresses || [],
		dateOfBirth: patient?.dateOfBirth || (null as Date | null), // Explicitly set dateOfBirth type to Date | null
	});

	const [isOpen, setIsOpen] = useState(true);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

const handleDateChange = (date: Date) => {
  if (date) {
    setFormData({ ...formData, dateOfBirth: date });
  } 
};
	const handleDrawerClose = () => {
		setIsOpen(false);
	};

	const handleDelete = async () => {
		try {
			if (patient) {
				await patientService.deletePatient(patient._id);
				setPatients(patients.filter((p) => p._id !== patient?._id));
			}
		} catch (error) {
			console.error('Error deleting patient:', error);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (isEdit) {
				console.log(patients);
				const updatedPatient = await patientService.updatePatient(formData);
				const updatedPatients = patients.map((p) =>
					p._id === updatedPatient?._id ? updatedPatient : p
				);
				setPatients(updatedPatients);
			} else {
				const patient = await patientService.createPatient(formData);
				setPatients((prevPatients) => [...prevPatients, patient]);
			}
			setIsOpen(false);
		} catch (error) {
			console.error('Error creating patient:', error);
		}
	};

	return (
		<>
			<div
				className={`fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform transition-transform ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='flex items-center justify-between px-4 py-2 bg-blue-500 text-white'>
					<h2 className='text-xl font-semibold'>
						{isEdit ? patient?.firstName : 'New Patient'}
					</h2>
					<button
						onClick={handleDrawerClose}
						className='text-white hover:text-gray-200 focus:outline-none'
					>
						<XIcon />
					</button>
				</div>
				<form onSubmit={handleSubmit} className='px-8 py-8'>
					<div className='mb-4'>
						<label
							htmlFor='firstName'
							className='block text-sm font-medium text-gray-700'
						>
							First Name
						</label>
						<input
							type='text'
							name='firstName'
							id='firstName'
							value={formData.firstName}
							onChange={handleChange}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='middleName'
							className='block text-sm font-medium text-gray-700'
						>
							Middle Name
						</label>
						<input
							type='text'
							name='middleName'
							id='middleName'
							value={formData.middleName}
							onChange={handleChange}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='lastName'
							className='block text-sm font-medium text-gray-700'
						>
							Last Name
						</label>
						<input
							type='text'
							name='lastName'
							id='lastName'
							value={formData.lastName}
							onChange={handleChange}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='dateOfBirth'
							className='block text-sm font-medium text-gray-700'
						>
							Date of Birth
						</label>
						<DatePicker
							id='dateOfBirth'
							value={formData.dateOfBirth}
              // @ts-ignore
							onChange={handleDateChange}
							dateFormat='MM/dd/yyyy'
							placeholderText='MM/DD/YYYY'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='status'
							className='block text-sm font-medium text-gray-700'
						>
							Status
						</label>
						<select
							name='status'
							id='status'
							onChange={handleChange}
							value={formData.status}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						>
							<option value='Inquiry'>Inquiry</option>
							<option value='Onboarding'>Onboarding</option>
							<option value='Active'>Active</option>
							<option value='Churned'>Churned</option>
						</select>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='primaryAddress'
							className='block text-sm font-medium text-gray-700'
						>
							Primary Address
						</label>
						<input
							type='text'
							name='primaryAddress'
							id='primaryAddress'
							value={formData.primaryAddress}
							onChange={handleChange}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='additionalAddresses'
							className='block text-sm font-medium text-gray-700'
						>
							Additional Addresses
						</label>
						<input
							type='text'
							name='additionalAddresses'
							id='additionalAddresses'
							value={formData.additionalAddresses.join(', ')}
							onChange={handleChange}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						/>
					</div>
					<div className='mt-4 flex justify-end'>
						<button
							type='button'
							className='mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='bg-blue-500 text-white px-4 py-2 rounded-md'
						>
							Save
						</button>
					</div>
				</form>
        <div className='flex items-center justify-center'>
        {isEdit && (
					<button
						onClick={handleDelete}
						className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex justify-center'
					>
						Delete
					</button>
				)}
        </div>
			</div>
		</>
	);
};

export default PatientFormDrawer;
