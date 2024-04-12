export interface Patient {
	_id: string;
	firstName: string;
	middleName: string;
	lastName: string;
	dateOfBirth: Date;
	status: string;
	street: string;
	city: string;
	zipCode: number | undefined;
	state: string;
	additionalAddress: {
		street: string;
		city: string;
		zipCode: number | undefined;
		state: string;
	};
	customFields: {
		name: string;
		type: string;
		value: string | number | undefined;
	}[];
}
