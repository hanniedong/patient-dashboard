import React, { useState } from 'react';

interface SearchFilters {
	firstName: string;
	lastName: string;
	status: string;
	minAge: number | undefined;
	maxAge: number | undefined;
	city: string;
}

interface SearchProps {
	onSearch: (filters: SearchFilters) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
	const [filters, setFilters] = useState<SearchFilters>({
		firstName: '',
		lastName: '',
		status: '',
		minAge: undefined,
		maxAge: undefined,
		city: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters({ ...filters, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(filters);
	};


	const handleClearFilters = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const initialState = {
			firstName: '',
			lastName: '',
			status: '',
			minAge: undefined,
			maxAge: undefined,
			city: '',
		}

		onSearch(initialState);
		setFilters(initialState)

	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex items-center space-x-4'>
				<div className='relative'>
					<input
						type='text'
						name='firstName'
						value={filters.firstName}
						onChange={handleChange}
						placeholder='First Name'
						className='border border-gray-300 rounded px-3 py-2 w-48 placeholder-gray-500 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<div className='relative'>
					<input
						type='text'
						name='lastName'
						value={filters.lastName}
						onChange={handleChange}
						placeholder='Last Name'
						className='border border-gray-300 rounded px-3 py-2 w-48 placeholder-gray-500 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<div className='relative'>
					<input
						type='text'
						name='city'
						value={filters.city}
						onChange={handleChange}
						placeholder='City'
						className='border border-gray-300 rounded px-3 py-2 w-48 placeholder-gray-500 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<div className='relative'>
					<select
						id='status'
						name='status'
						value={filters.status}
						onChange={handleChange}
						className='border border-gray-300 rounded px-3 py-2 w-24 placeholder-gray-500 focus:outline-none focus:border-blue-500'
					>
						<option className='text-gray-50' value=''>Select Status</option>
						<option value='Inquiry'>Inquiry</option>
						<option value='Onboarding'>Onboarding</option>
						<option value='Active'>Active</option>
						<option value='Churned'>Churned</option>
					</select>
				</div>
				<div className='relative'>
					<input
						type='number'
						name='minAge'
						value={filters.minAge}
						onChange={handleChange}
						placeholder='Min Age'
						className='border border-gray-300 rounded px-3 py-2 w-24 placeholder-gray-500 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<span className='text-gray-500'>-</span>
				<div className='relative'>
					<input
						type='number'
						name='maxAge'
						value={filters.maxAge}
						onChange={handleChange}
						placeholder='Max Age'
						className='border border-gray-300 rounded px-3 py-2 w-24 placeholder-gray-500 focus:outline-none focus:border-blue-500'
					/>
				</div>
				<button
					onClick={handleClearFilters}
					className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow'
				>
					Clear Filters
				</button>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow'
				>
					Search
				</button>
			</div>
		</form>
	);
};

export default Search;
