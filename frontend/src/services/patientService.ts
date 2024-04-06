import { Patient } from '@/types/patient.interface';
import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Update with your backend API base URL

const patientService = {
	getAllPatients: async (): Promise<Patient[]> => {
		try {
			const response = await axios.get<Patient[]>(
				`${baseURL}/patients?providerId=6610a8796dacee7e4a036f64`
			);
			return response.data;
		} catch (error) {
			console.error('Error fetching patients:', error);
			throw error;
		}
	},
};

export default patientService;
