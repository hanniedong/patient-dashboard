import React from 'react';
import OverflowMenu from '../OverflowMenu';
import AddPatientButton from '../AddPatientButton';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <div className="flex">
            <OverflowMenu />
            <AddPatientButton />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;