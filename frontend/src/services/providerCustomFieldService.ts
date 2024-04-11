import { ProviderCustomField } from '@/types/providerCustomField.interface';
import axios from 'axios';

const BASE_URL = 'https://patient-dashboard-api-2e3cc5435e22.herokuapp.com'; // Update with your backend API base URL
const DEV_URL = 'http://localhost:4000';

const providerCustomFieldService = {
	getAllProviderCustomFields: async (): Promise<ProviderCustomField[]> => {
		try {
			const response = await axios.get<ProviderCustomField[]>(
				`${DEV_URL}/providers-custom-fields?providerId=6610a8796dacee7e4a036f64`
			);
			return response.data;
		} catch (error) {
			console.error('Error fetching provider custom fields:', error);
			throw error;
		}
	},
	createProviderCustomField: async (fieldData: any) => {
		console.log(fieldData);
		const response = await axios.post<ProviderCustomField>(
			`${DEV_URL}/providers-custom-fields`,
			{
				...fieldData,
				providerId: '6610a8796dacee7e4a036f64',
			}
		);
		return response.data;
	},
};

export default providerCustomFieldService;
