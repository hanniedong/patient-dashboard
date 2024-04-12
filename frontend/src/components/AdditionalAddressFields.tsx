import React from 'react';

interface Props {
  formData: { street: string; city: string; zipCode: number; state: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isAdditionalAddress?: boolean
}

const AdditionalAddressFields: React.FC<Props> = ({ formData, handleChange, isAdditionalAddress}) => {
  return (
    <>
      <div className='mb-4'>
        <label
          htmlFor='street'
          className='block text-sm font-medium text-gray-700'
        >
          Street
        </label>
        <input
          type='text'
          name={isAdditionalAddress ? 'addStreet': 'street'}
          id='street'
          value={formData.street}
          onChange={handleChange}
          className='mt-1 p-1 border border-gray-300 rounded-md w-full'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='city'
          className='block text-sm font-medium text-gray-700'
        >
          City
        </label>
        <input
          type='text'
          name='city'
          id={isAdditionalAddress ? 'addCity': 'city'}
          value={formData.city}
          onChange={handleChange}
          className='mt-1 p-1 border border-gray-300 rounded-md w-full'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='state'
          className='block text-sm font-medium text-gray-700'
        >
          State
        </label>
        <input
          type='text'
          name='state'
          id={isAdditionalAddress ? 'addState': 'state'}
          value={formData.state}
          onChange={handleChange}
          className='mt-1 p-1 border border-gray-300 rounded-md w-full'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='zipCode'
          className='block text-sm font-medium text-gray-700'
        >
          Zip Code
        </label>
        <input
          type='text'
          name='zipCode'
          id={isAdditionalAddress ? 'addZipCode': 'zipCode'}
          value={formData.zipCode}
          onChange={handleChange}
          className='mt-1 p-1 border border-gray-300 rounded-md w-full'
        />
      </div>
    </>
  );
};

export default AdditionalAddressFields;