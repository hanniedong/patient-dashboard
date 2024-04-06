export interface Patient {
	_id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: string;
	status: string;
	primaryAddress: string;
	additionalAddresses: string[];
	customFields: Record<string, string>;
}
