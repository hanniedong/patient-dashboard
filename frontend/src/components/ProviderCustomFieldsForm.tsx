import React, { useEffect, useState } from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import providerCustomFieldService from '@/services/providerCustomFieldService';
import { useProviderCustomFieldsContext } from '@/context/ProviderCustomFieldsContext';

interface Props {
	onClose: () => void;
}

const CustomFieldsForm: React.FC<Props> = ({ onClose }) => {
	const [fieldName, setFieldName] = useState('');
	const [fieldType, setFieldType] = useState('text');
	const { providerCustomFields, setProviderCustomFields } =
		useProviderCustomFieldsContext();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			// Call the API to create a new provider custom field
			const field = await providerCustomFieldService.createProviderCustomField({
				name: fieldName,
				type: fieldType,
			});
			setProviderCustomFields((prevFields) => [...prevFields, field]);
		} catch (error) {
			console.error('Error creating field:', error);
		}
	};

  useEffect(() => {
    const fetchCustomFields = async () => {
      try {
        const customFieldsData = await providerCustomFieldService.getAllProviderCustomFields();
        setProviderCustomFields(customFieldsData);
      } catch (error) {
        console.error('Error fetching custom fields:', error);
      }
    };

    fetchCustomFields();
  }, []);

	return (
		<>
			<div className='fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform transition-transform translate-x-0'>
				<div className='flex items-center justify-between px-4 py-2 bg-blue-500 text-white'>
					<h2 className='text-xl font-semibold'>Custom Fields</h2>
					<button
						onClick={onClose}
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
				<form onSubmit={handleSubmit} className='px-8 py-8'>
        <h2 className ='text-xl font-semibold py-3'>Add Custom Field</h2>

					<div className='mb-4'>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700'
						>
							Name
						</label>
						<input
							type='text'
							name='name'
							id='name'
							value={fieldName}
							onChange={(e) => setFieldName(e.target.value)}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='type'
							className='block text-sm font-medium text-gray-700'
						>
							Type
						</label>
						<select
							name='type'
							id='type'
							value={fieldType}
							onChange={(e) => setFieldType(e.target.value)}
							className='mt-1 p-1 border border-gray-300 rounded-md w-full'
						>
							<option value='text'>Text</option>
							<option value='number'>Number</option>
						</select>
					</div>
					<div className='mt-4 flex justify-end'>
						<button
							type='button'
							onClick={onClose}
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
        <div className='m-8'>
        <h2 className="text-lg font-bold mb-2">Current Custom Fields</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {providerCustomFields.map((field) => (
              <tr key={field._id}>
                <td className="border px-4 py-2">{field.name}</td>
                <td className="border px-4 py-2">{field.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
		</>
	);
};

export default CustomFieldsForm;
