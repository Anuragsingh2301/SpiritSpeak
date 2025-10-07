import { Link, useLocation } from 'react-router-dom';
import LogoSVG from '../../assets/SVG.svg';
import { JournalIcon, CompassIcon, TrophyIcon, UserIcon } from '../../assets/icons';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: JournalIcon },
  { name: 'Guides', path: '/guides', icon: CompassIcon },
  { name: 'Progress', path: '/progress', icon: TrophyIcon },
  { name: 'Profile', path: '/profile', icon: UserIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white shadow-xl flex flex-col border-r border-gray-100">
      {/* Logo and Brand Name */}
      <div className="p-4 m-5 w-[193px] h-[40px] flex justify-around space-x-1.5 items-center border-b border-gray-100">
        <img src={LogoSVG} alt="Logo" className="h-[40px] w-[40px] ml-0" />
        <span className="text-xl font-bold text-[#40916c]">SpiritSpeak</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          const activeClasses = `
            bg-gradient-to-r from-[#14B7A5] via-[#11A697] to-[#0D968A] text-white shadow-md
          `;
          
          const inactiveClasses = `
            text-gray-600 
            hover:bg-[#E0F2F1] hover:text-[#14B7A5]
            focus:bg-[#E0F2F1] focus:text-[#14B7A5]
          `;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${isActive ? activeClasses : inactiveClasses}
              `}
            >
              {Icon && <Icon className="w-5 h-5 mr-3" />} 
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;