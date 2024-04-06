import { Patient } from '@/types/patient.interface';
import axios from 'axios';

const BASE_URL = 'https://patient-dashboard-api-2e3cc5435e22.herokuapp.com'; // Update with your backend API base URL

const patientService = {
	getAllPatients: async (): Promise<Patient[]> => {
		try {
			const response = await axios.get<Patient[]>(
				`${BASE_URL}/patients?providerId=6610a8796dacee7e4a036f64`
			);
			return response.data;
		} catch (error) {
			console.error('Error fetching patients:', error);
			throw error;
		}
	},
	createPatient: async (patientData: any) => {
		console.log(patientData);
		const response = await axios.post<Patient>(`${BASE_URL}/patients`, {
			...patientData,
			providerId: '6610a8796dacee7e4a036f64',
		});
		return response.data;
	},
	updatePatient: async (patientData: any) => {
		console.log(patientData);
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
