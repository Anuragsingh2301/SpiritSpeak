import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoSVG from '../../assets/SVG.svg';
import { JournalIcon, CompassIcon, TrophyIcon, UserIcon, XPIcon } from '../../assets/icons';
import { FiLogOut } from 'react-icons/fi';
import { useLogoutMutation } from '../../apis/auth/AuthApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APISlice } from '../../apis/APISlice';
import { useGetXPDataQuery } from '../../apis/xpApiSlice';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: JournalIcon },
  { name: 'Guides', path: '/guides', icon: CompassIcon },
  { name: 'Progress', path: '/progress', icon: TrophyIcon },
  { name: 'Profile', path: '/profile', icon: UserIcon },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  
  // Get XP data from Redux store and API
  const xpData = useSelector((state) => state.xp);
  const { data: xpApiData } = useGetXPDataQuery();
  
  // Use Redux data first, fallback to API data
  const totalXP = xpData.totalXP || xpApiData?.data?.totalXP || 0;
  const currentLevel = xpData.currentLevel || xpApiData?.data?.currentLevel || 'Spark';

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Reset all API cache after successful logout
      dispatch(APISlice.util.resetApiState());
      console.log('Logout successful');
      navigate('auth/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-64 h-screen bg-white shadow-xl flex flex-col border-r border-gray-100">
      {/* Logo and Brand Name */}
      <div className="p-4 m-5 w-[193px] h-[40px] flex justify-around space-x-1.5 items-center border-b border-gray-100">
        <img src={LogoSVG} alt="Logo" className="h-[40px] w-[40px] ml-0" />
        <span className="text-xl font-bold text-[#40916c]">SpiritSpeak</span>
      </div>

      {/* XP Display */}
      <div className="mx-4 mb-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-amber-900 uppercase tracking-wide">Level</span>
          <span className="text-sm font-bold text-amber-900">{currentLevel}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <XPIcon className="w-6 h-6 text-amber-900" />
          <div>
            <p className="text-2xl font-bold text-amber-900 leading-none">{totalXP.toLocaleString()}</p>
            <p className="text-xs text-amber-800 font-medium">Total XP</p>
          </div>
        </div>
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

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="
            flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
            text-gray-600 
            hover:bg-[#E0F2F1] hover:text-[#14B7A5]
            focus:bg-[#E0F2F1] focus:text-[#14B7A5]
            w-full
            cursor-pointer
          "
        >
          <FiLogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;