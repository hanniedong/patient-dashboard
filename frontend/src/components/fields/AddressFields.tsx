import React from 'react';
import InputField from './InputField';
import { Patient } from '@/types/patient.interface';

interface AddressFieldProps {
  isAdditionalAddress?: boolean;
  formData: Patient;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({ isAdditionalAddress, formData, handleChange }) => {
  const { additionalAddress } = formData;
  const address = isAdditionalAddress ? additionalAddress : formData;

  return (
    <>
      <InputField label="Street" name="street" value={address.street} onChange={handleChange} />
      <InputField label="City" name="city" value={address.city} onChange={handleChange} />
      <InputField label="State" name="state" value={address.state} onChange={handleChange} />
      <InputField label="Zip Code" name="zipCode" value={address.zipCode} onChange={handleChange} />
    </>
  );
};

export default AddressField;
