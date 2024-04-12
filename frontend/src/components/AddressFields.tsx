import React from 'react';

interface AddressFieldProps {
  isAdditionalAddress: boolean;
  formData: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    additionalAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({ isAdditionalAddress, formData, handleChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={`street`} className="block text-sm font-medium text-gray-700">
        Street
      </label>
      <input
        type="text"
        name={`street`}
        id={`street`}
        value={isAdditionalAddress ? formData.additionalAddress?.street : formData.street}
        onChange={(e) => handleChange(e)}
        className="mt-1 p-1 border border-gray-300 rounded-md w-full"
      />
      <label htmlFor={`city`} className="block text-sm font-medium text-gray-700">
        City
      </label>
      <input
        type="text"
        name={`city`}
        id={`city`}
        value={isAdditionalAddress ? formData.additionalAddress?.city : formData.city}
        onChange={(e) => handleChange(e)}
        className="mt-1 p-1 border border-gray-300 rounded-md w-full"
      />
      <label htmlFor={`state`} className="block text-sm font-medium text-gray-700">
        State
      </label>
      <input
        type="text"
        name={`state`}
        id={`state`}
        value={isAdditionalAddress ? formData.additionalAddress?.state : formData.state}
        onChange={(e) => handleChange(e)}
        className="mt-1 p-1 border border-gray-300 rounded-md w-full"
      />
      <label htmlFor={`zipCode`} className="block text-sm font-medium text-gray-700">
        Zip Code
      </label>
      <input
        type="text"
        name={`zipCode`}
        id={`zipCode}`}
        value={isAdditionalAddress ? formData.additionalAddress?.zipCode : formData.zipCode}
        onChange={(e) => handleChange(e)}
        className="mt-1 p-1 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

export default AddressField;