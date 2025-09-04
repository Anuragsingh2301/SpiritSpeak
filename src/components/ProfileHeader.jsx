const ProfileHeader = () => {

  const userData = {
    initials: 'JD',
    name: 'Journey Seeker',
    memberSince: 'Dec 2024',
    streak: 5,
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg text-center">
      <div className="w-24 h-24 bg-white/30 rounded-full mx-auto flex items-center justify-center mb-4">
        <span className="text-4xl font-bold">{userData.initials}</span>
      </div>
      <h1 className="text-2xl font-bold">{userData.name}</h1>
      <p className="text-sm opacity-80 mb-4">Member since {userData.memberSince}</p>
      <div className="inline-flex items-center gap-2 bg-black/20 py-1 px-3 rounded-full text-xs">
        {/* You can use an icon library like 'react-icons' for the calendar icon */}
        <span>🗓️</span>
        <span>{userData.streak} day reflection streak</span>
      </div>
    </div>
  );
};

export default ProfileHeader;