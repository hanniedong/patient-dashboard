export interface Patient {
	_id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: Date;
	status: string;
	primaryAddress: string;
	additionalAddresses: string[];
}
