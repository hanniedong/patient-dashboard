import { Patient } from '@/types/patient.interface';
import axios from 'axios';
import { BASE_URL, PROVIDER_ID } from './constants';

const patientService = {
	getAllPatients: async (searchQuery?: {
		firstName: string;
		lastName: string;
		status: string;
		minAge: number;
		maxAge: number;
		city: string;
	}): Promise<Patient[]> => {
		try {
			const response = await axios.get<Patient[]>(
				`${BASE_URL}/patients?providerId=${PROVIDER_ID}`,
				{
					params: {
						search: searchQuery,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error('Error fetching patients:', error);
			throw error;
		}
	},
	createPatient: async (patientData: any) => {
		const response = await axios.post<Patient>(`${BASE_URL}/patients`, {
			...patientData,
			providerId: PROVIDER_ID,
		});
		return response.data;
	},
	updatePatient: async (patientData: any) => {
		const response = await axios.put<Patient>(
			`${BASE_URL}/patients/${patientData.id}`,
			{
				...patientData,
			}
		);
		return response.data;
	},
	deletePatient: async (patientId: string) => {
		const response = await axios.delete<Patient>(
			`${BASE_URL}/patients/${patientId}`
		);
		return response.data;
	},
};

export default patientService;
