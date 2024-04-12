export class CreatePatientDto {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  status: string;
  street: string;
  city: string;
  zipCode: number;
  state: string;
  additionalAddress: {
    street: string;
    city: string;
    zipCode: number;
    state: string;
  };
  customFields: { name: string; type: string; value: string | number }[];
}
