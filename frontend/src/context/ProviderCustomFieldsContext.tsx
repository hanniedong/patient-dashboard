import React, { createContext, useContext, useState } from 'react';
import { ProviderCustomField } from '@/types/providerCustomField.interface';

// Define the custom fields context
interface ProviderCustomFieldsState {
  providerCustomFields: ProviderCustomField[];
  setProviderCustomFields: React.Dispatch<
    React.SetStateAction<ProviderCustomField[]>
  >;
}

// Create the context
const ProviderCustomFieldsContext = createContext<
  ProviderCustomFieldsState | undefined
>(undefined);

// Create a custom hook to use the context
export const useProviderCustomFieldsContext = () => {
  const context = useContext(ProviderCustomFieldsContext);
  if (!context) {
    throw new Error(
      'useProviderCustomFieldsContext must be used within a ProviderCustomFieldsProvider'
    );
  }
  return context;
};

// Create the provider component
export const ProviderCustomFieldsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [providerCustomFields, setProviderCustomFields] = useState<
    ProviderCustomField[]
  >([]);

  return (
    <ProviderCustomFieldsContext.Provider
      value={{ providerCustomFields, setProviderCustomFields }}
    >
      {children}
    </ProviderCustomFieldsContext.Provider>
  );
};
