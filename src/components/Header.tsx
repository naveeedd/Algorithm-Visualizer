import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 flex justify-center items-center">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6 justify-center">
          <Brain size={40} className="text-white" />
          <h1 className="text-3xl font-bold">CS302 - Design and Analysis of Algorithm</h1>
        </div>
        <h2 className="text-xl mb-4">Project Fall 2024</h2>
        <div className="text-sm opacity-90">
          <h3 className="font-semibold mb-2">Group Members:</h3>
          <ul className="space-y-1">
            <li>Naveed Raza 22k-4807</li>
            <li>Faiq Ahmed Khan 22k-4810</li>
            <li>Shaheer Ghouri 22k-4837</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
