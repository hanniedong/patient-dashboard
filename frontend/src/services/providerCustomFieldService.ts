import { ProviderCustomField } from '@/types/providerCustomField.interface';
import axios from 'axios';
import { BASE_URL, PROVIDER_ID } from './constants';

const providerCustomFieldService = {
	getAllProviderCustomFields: async (): Promise<ProviderCustomField[]> => {
		try {
			const response = await axios.get<ProviderCustomField[]>(
				`${BASE_URL}/providers-custom-fields?providerId=${PROVIDER_ID}`
			);
			return response.data;
		} catch (error) {
			console.error('Error fetching provider custom fields:', error);
			throw error;
		}
	},
	createProviderCustomField: async (fieldData: any) => {
		const response = await axios.post<ProviderCustomField>(
			`${BASE_URL}/providers-custom-fields`,
			{
				...fieldData,
				providerId: PROVIDER_ID,
			}
		);
		return response.data;
	},
};

export default providerCustomFieldService;
