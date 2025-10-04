import { FaCheck, FaDownload, FaFire, FaLock, FaSeedling, FaShieldAlt, FaStar, FaTrophy, FaWpbeginner } from "react-icons/fa";

// --- Reusable Components for Card Sections ---

const StatCard = ({ icon, value, label }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
    {icon}
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const DottedSeparator = () => <div className="border-t-2 border-dotted border-gray-300 my-6" />;


// --- Main Profile Card Component ---

export default function UserProfileCard() {
  return (
      <div className="max-w-sm w-full bg-white p-6 border-none rounded-xl shadow-lg">
        
        {/* Header Section */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center mb-3">
            <span className="text-5xl font-bold text-white">A</span>
          </div>
          <p className="text-gray-600">
            <span className="font-bold text-gray-800">@AJRAGNAROK</span> • Joined 2025
          </p>
        </div>

        <DottedSeparator />

        {/* Overview Section */}
        <div>
          <h2 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-4">
            Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              icon={<FaFire className="w-7 h-7 text-orange-400 mb-1" />} 
              value="7 Days" 
              label="Current Streak" 
            />
            <StatCard 
              icon={<FaStar className="w-7 h-7 text-yellow-400 mb-1" />} 
              value="4,585" 
              label="Total XP" 
            />
            <StatCard 
              icon={<FaCheck className="w-7 h-7 text-purple-500 mb-1" />} 
              value="23" 
              label="Quests Done" 
            />
            <StatCard 
              icon={<FaTrophy className="w-7 h-7 text-red-500 mb-1" />} 
              value="5" 
              label="Achievements" 
            />
            <StatCard 
              icon={<FaShieldAlt className="w-7 h-7 text-green-500 mb-1" />} 
              value="Sage" 
              label="Current League" 
            />
            <StatCard 
              icon={<FaWpbeginner className="w-7 h-7 text-blue-500 mb-1" />} 
              value="1" 
              label="Perfect Weeks" 
            />
          </div>
        </div>

        <DottedSeparator />

        {/* Monthly Badges Section */}
        <div>
          <h2 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-4">
            Monthly Badges
          </h2>
          <div className="flex justify-around items-center">
            {/* Active Badge */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-teal-400 rounded-full flex items-center justify-center">
                <FaSeedling className="w-8 h-8 text-white" />
              </div>
              <span className="mt-2 text-sm font-bold text-teal-500">Sep</span>
            </div>

            {/* Locked Badges */}
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <FaLock className="w-7 h-7 text-gray-400" />
            </div>
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <FaLock className="w-7 h-7 text-gray-400" />
            </div>
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
              <FaLock className="w-7 h-7 text-gray-400" />
            </div>
          </div>
        </div>

        <DottedSeparator />

        {/* Footer Section */}
        <div className="text-center">
          <button className="flex items-center justify-center w-full text-blue-500 font-semibold hover:text-blue-700 transition-colors">
            <FaDownload className="w-5 h-5 mr-2" />
            Export All Entries
          </button>
        </div>
      </div>
  );
}