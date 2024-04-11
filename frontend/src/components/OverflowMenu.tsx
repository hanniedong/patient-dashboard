import React, { useState } from 'react';
import CustomFieldsForm from './ProviderCustomFieldsForm';

const OverflowMenu = () => {
	const [showCustomFieldsForm, setShowCustomFieldsForm] = useState(false);
	const [showOverflowMenu, setShowOverflowMenu] = useState(false);

	const handleCustomFieldsClick = () => {
		setShowCustomFieldsForm(true);
    setShowOverflowMenu(false)
	};

  const handleOnSettingsButtonClick = () => {
    setShowOverflowMenu(true)
  }

	const handleCloseCustomFieldsForm = () => {
		setShowCustomFieldsForm(false);
	};

	return (
		<div className='relative inline-block text-left'>
			<button
				type='button'
				className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
				id='options-menu'
        onClick={handleOnSettingsButtonClick}
			>
				Settings
			</button>
			{showOverflowMenu && (
				<div
					className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='options-menu'
				>
					<div className='py-1' role='none'>
						<button
							onClick={handleCustomFieldsClick}
							className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
							role='menuitem'
						>
							Custom Fields
						</button>
					</div>
				</div>
			)}
			{showCustomFieldsForm && (
        <CustomFieldsForm onClose={handleCloseCustomFieldsForm} />
			)}
		</div>
	);
};

export default OverflowMenu;
