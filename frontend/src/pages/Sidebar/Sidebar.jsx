import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoSVG from '../../assets/SVG.svg';
import DiamondIcon from './Diamond'; // We'll create this simple icon below

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Guides', path: '/guides' },
  { name: 'Progress', path: '/progress' },
  { name: 'Profile', path: '/profile' },
];

const Sidebar = () => {
  const location = useLocation();

  const primaryColor = '#40916c'; // SpiritSpeak brand green/teal

  return (
    <div className="w-64 h-screen bg-white shadow-xl flex flex-col border-r border-gray-100">
      {/* Logo and Brand Name */}
      <div className="p-4 m-5 w-[193px] h-[40px] flex justify-around space-x-1.5 items-center border-b border-gray-100">
        {/* Replace with your actual LogoSVG usage, if needed */}
        <img src={LogoSVG} alt="Logo" className="h-[40px] w-[40px]  ml-0" />
        <span className="text-xl font-bold text-[#40916c]">SpiritSpeak</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          const activeClasses = `
            bg-[${primaryColor}] text-white shadow-md
            hover:bg-[${primaryColor}] hover:opacity-90
          `;
          
          const inactiveClasses = `
            text-gray-600 hover:bg-gray-100
          `;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-150
                ${isActive ? activeClasses : inactiveClasses}
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Premium Callout (Fixed at bottom) */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg flex items-center space-x-2">
            <DiamondIcon />
            <span className="text-sm font-medium">Premium</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;