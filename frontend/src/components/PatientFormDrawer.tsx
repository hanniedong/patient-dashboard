import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import patientService from '@/services/patientService';
import { usePatientsContext } from '@/context/PatientContext';
import { Patient } from '@/types/patient.interface';
import { useProviderCustomFieldsContext } from '@/context/ProviderCustomFieldsContext';
import AddressField from './AddressFields';

interface Props {
	patient?: Patient;
	isEdit?: Boolean;
}

const PatientFormDrawer: React.FC<Props> = ({ isEdit, patient }) => {
	const { patients, setPatients } = usePatientsContext();
	const { providerCustomFields } = useProviderCustomFieldsContext();
	const customFields: any = {};
	const [
		shouldShowAdditionalAddressFields,
		setShouldShowAdditionalAddressFields,
	] = useState(false);

	const handleOnAdditionalAddressClick = () => {
		setShouldShowAdditionalAddressFields(!shouldShowAdditionalAddressFields);
	};

	providerCustomFields.forEach((customField) => {
		const name = customField.name;
		const type = customField.type === 'text' ? '' : undefined;
		customFields[name] = type;
	});

	const [formData, setFormData] = useState({
		id: patient?._id || '',
		firstName: patient?.firstName || '',
		middleName: patient?.middleName || '',
		lastName: patient?.lastName || '',
		status: patient?.status || 'Inquiry',
		street: patient?.street || '',
		state: patient?.state || '',
		city: patient?.city || '',
		zipCode: patient?.zipCode || '',
		additionalAddress: patient?.additionalAddress || {},
		dateOfBirth: patient?.dateOfBirth || null,
		customFields: patient?.customFields || {}
	});

	const [isOpen, setIsOpen] = useState(true);

	const handleCustomFieldsChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			customFields: { ...formData.customFields, [name]: value },
		});
	};

	const handleAdditionalAddressChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			additionalAddress: { ...formData.additionalAddress, [name]: value },
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDateChange = (date: Date | null) => {
		setFormData({ ...formData, dateOfBirth: date });
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
				const updatedPatient = await patientService.updatePatient(formData);
				const updatedPatients = patients.map((p) =>
					p._id === updatedPatient._id ? updatedPatient : p
				);
				setPatients(updatedPatients);
			} else {
				const newPatient = await patientService.createPatient(formData);
				setPatients([...patients, newPatient]);
			}
			setIsOpen(false);
		} catch (error) {
			console.error('Error creating/updating patient:', error);
		}
	};

	return (
		<>
			<div
				className={`fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform transition-transform ${
					isOpen ? 'translate-x-0 z-50' : 'translate-x-full'
				}`}
			>
				<div className='flex items-center justify-between px-4 py-2 bg-blue-500 text-white '>
					<h2 className='text-xl font-semibold'>
						{isEdit ? patient?.firstName : 'New Patient'}
					</h2>
					<button
						onClick={handleDrawerClose}
						className='text-white hover:text-gray-200 focus:outline-none'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
				<form
					onSubmit={handleSubmit}
					className='px-8 py-8 overflow-y-auto max-h-[calc(100vh-4rem)]'
				>
					{/* Form fields */}
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
					{/* Address fields */}
					<AddressField handleChange={handleChange} formData={formData} />
					{/* Additional address fields */}
					<div className='mb-4'>
						<button
							type='button'
							onClick={handleOnAdditionalAddressClick}
							className='flex items-center text-sm text-blue-500 focus:outline-none'
						>
							{!shouldShowAdditionalAddressFields
								? ' Show Additional Address Fields'
								: 'Hide Additional Address Fields'}
						</button>
						{shouldShowAdditionalAddressFields && (
							<AddressField
								isAdditionalAddress={true}
								handleChange={handleAdditionalAddressChange}
								formData={formData}
							/>
						)}
					</div>
					{/* Custom fields */}
					{providerCustomFields.length !== 0 &&
						providerCustomFields.map((customField) => {
							console.log(formData.customFields[customField.name])
							return(
							<div className='mb-4' key={customField._id}>
								<label
									htmlFor={customField.name}
									className='block text-sm font-medium text-gray-700'
								>
									{customField.name}
								</label>
								<input
									type={customField.type}
									name={customField.name}
									id={customField.name}
									value={formData.customFields[customField.name]}
									onChange={handleCustomFieldsChange}
									className='mt-1 p-1 border border-gray-300 rounded-md w-full'
								/>
							</div>
						)})}
					{/* Buttons */}
					<div className='mt-4 flex justify-end'>
						<button
							type='button'
							className='mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md'
							onClick={handleDrawerClose}
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
				{/* Delete button */}
				{isEdit && (
					<div className='flex items-center justify-center'>
						<button
							onClick={handleDelete}
							className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex justify-center'
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default PatientFormDrawer;
