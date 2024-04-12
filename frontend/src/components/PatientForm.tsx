import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import patientService from '@/services/patientService';
import { usePatientsContext } from '@/context/PatientContext';
import { Patient } from '@/types/patient.interface';
import { useProviderCustomFieldsContext } from '@/context/ProviderCustomFieldsContext';
import AddressField from './fields/AddressFields';
import InputField from './fields/InputField';

interface Props {
  patient?: Patient;
  isEdit?: boolean;
}

const PatientForm: React.FC<Props> = ({ isEdit, patient }) => {
  const { patients, setPatients } = usePatientsContext();
  const { providerCustomFields } = useProviderCustomFieldsContext();

  const [formData, setFormData] = useState<Patient>({
    _id: patient?._id || '',
    firstName: patient?.firstName || '',
    middleName: patient?.middleName || '',
    lastName: patient?.lastName || '',
    status: patient?.status || 'Inquiry',
    street: patient?.street || '',
    state: patient?.state || '',
    city: patient?.city || '',
    zipCode: patient?.zipCode || undefined,
    additionalAddress: patient?.additionalAddress || {  street: '',
      city: '',
      zipCode: undefined,
      state: ''},
    dateOfBirth: patient?.dateOfBirth || undefined,
    customFields: patient?.customFields ||[]
  });

  const [shouldShowAdditionalAddressFields, setShouldShowAdditionalAddressFields] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isEdit) {
      setIsOpen(true);
    }
  }, [isEdit]);

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (patient) {
        await patientService.deletePatient(patient._id);
        setPatients(patients.filter(p => p._id !== patient?._id));
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
      console.log("SUBMIT")
			setIsOpen(false);
		} catch (error) {
			console.error('Error creating/updating patient:', error);
		}
	};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAdditionalAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      additionalAddress: { ...prevState.additionalAddress, [name]: value }
    }));
  };

  const handleDateChange = (date: Date) => {
		setFormData({ ...formData, dateOfBirth: date });
	};

  const handleCustomFieldsChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      customFields: { ...prevState.customFields, [name]: value }
    }));
  };

  return (
    <>
      <div className={`fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0 z-50' : 'translate-x-full'
      }`}>
        <div className='flex items-center justify-between px-4 py-2 bg-blue-500 text-white'>
          <h2 className='text-xl font-semibold'>
            {isEdit ? patient?.firstName : 'New Patient'}
          </h2>
          <button onClick={handleDrawerClose} className='text-white hover:text-gray-200 focus:outline-none'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className='px-8 py-8 overflow-y-auto max-h-[calc(100vh-4rem)]'>
          {/* Form fields */}
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <div className='mb-4'>
            <label htmlFor='dateOfBirth' className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <DatePicker id='dateOfBirth' value={formData.dateOfBirth} onChange={handleDateChange} dateFormat='MM/dd/yyyy' placeholderText='MM/DD/YYYY' />
          </div>
          <div className='mb-4'>
            <label htmlFor='status' className='block text-sm font-medium text-gray-700'>Status</label>
            <select name='status' id='status' onChange={handleChange} value={formData.status} className='mt-1 p-1 border border-gray-300 rounded-md w-full'>
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
            <button type='button' onClick={() => setShouldShowAdditionalAddressFields(!shouldShowAdditionalAddressFields)} className='flex items-center text-sm text-blue-500 focus:outline-none'>
              {!shouldShowAdditionalAddressFields ? ' Show Additional Address Fields' : 'Hide Additional Address Fields'}
            </button>
            {shouldShowAdditionalAddressFields && <AddressField isAdditionalAddress handleChange={handleAdditionalAddressChange} formData={formData} />}
          </div>
          {/* Custom fields */}
          {providerCustomFields.map(customField => (
            <InputField
              key={customField._id}
              label={customField.name}
              name={customField.name}
              value={formData.customFields[customField.name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleCustomFieldsChange(customField.name, e.target.value)}
            />
          ))}
          {/* Buttons */}
          <div className='mt-4 flex justify-end'>
            <button type='button' className='mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md' onClick={handleDrawerClose}>Cancel</button>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Save</button>
          </div>
        </form>
        {/* Delete button */}
        {isEdit && (
          <div className='flex items-center justify-center'>
            <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex justify-center'>Delete</button>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientForm;
