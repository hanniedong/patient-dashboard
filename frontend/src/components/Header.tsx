import React from 'react';
import OverflowMenu from './OverflowMenu';
import AddPatient from './AddPatient';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <div className="flex">
            <OverflowMenu />
            <AddPatient />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;