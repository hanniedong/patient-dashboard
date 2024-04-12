import React from 'react';

interface InputFieldProps {
	label: string;
	name: string;
	value: string | number | undefined;
	type?: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	value,
	onChange,
	type,
}) => {
	return (
		<div className='mb-4'>
			<label htmlFor={name} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<input
				type={type || 'text'}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className='mt-1 p-1 border border-gray-300 rounded-md w-full'
			/>
		</div>
	);
};

export default InputField;
