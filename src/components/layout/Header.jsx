// Header component for Pacific Connectivity 2050

import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
        Pacific Connectivity 2050
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        A data-driven visualization showcasing technology access, digital skills, and connectivity across Pacific Island nations
      </p>
      <div className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
        Blue Pacific 2050 – Technology & Connectivity
      </div>
    </header>
  );
};

export default Header;