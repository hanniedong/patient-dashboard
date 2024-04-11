import { subYears } from 'date-fns';

export const getBirthYearRange = (
  minAge: number,
  maxAge: number,
): [Date, Date] => {
  const currentDate = new Date();
  const minBirthYear = maxAge
    ? subYears(currentDate, maxAge).getFullYear()
    : subYears(currentDate, 200).getFullYear();
  const maxBirthYear = minAge
    ? subYears(currentDate, minAge).getFullYear()
    : subYears(currentDate, 0).getFullYear();
  const minDate = new Date(`${minBirthYear}-01-01`);
  const maxDate = new Date(`${maxBirthYear}-12-31`);
  return [minDate, maxDate];
};
