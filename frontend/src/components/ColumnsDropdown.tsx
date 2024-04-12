import React, { useState } from 'react';

interface Props {
  columnNames: string[];
  hiddenColumns: string[];
  handleColumnToggle: (columnName: string) => void;
}

const ColumnsDropdown: React.FC<Props> = ({
  columnNames,
  hiddenColumns,
  handleColumnToggle,
}) => {
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const handleOnClick = () => {
    setShouldShowMenu(!shouldShowMenu);
  };

  const formatColumnNames = (columnName: string) => {
    const string = columnName.split(/(?=[A-Z])/).join(' ');
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className='absolute right-20 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-2'
      role='menu'
    >
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'
          id='options-menu'
          onClick={handleOnClick}
        >
          Columns
        </button>
      </div>
      {shouldShowMenu && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
        >
          <div className='py-1' role='none'>
            {/* Map through columnNames and render a checkbox for each */}
            {columnNames.map((columnName) => (
              <div key={columnName} className='flex items-center px-4 py-2'>
                <input
                  type='checkbox'
                  checked={!hiddenColumns.includes(columnName)}
                  onChange={() => handleColumnToggle(columnName)}
                  className='mr-2'
                  id={columnName}
                />
                <label htmlFor={columnName} className='text-sm text-gray-700'>
                  {formatColumnNames(columnName)}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnsDropdown;