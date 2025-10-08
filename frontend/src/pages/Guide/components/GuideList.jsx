import { FaStar } from 'react-icons/fa';

// A single item in the guide list
const GuideListItem = ({ guide, isActive, onSelect }) => {
  const baseClasses = "flex items-center w-full text-left p-3 rounded-lg cursor-pointer transition-colors duration-200";
  const activeClasses = isActive ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100";

  const avatarColors = {
    1: 'border-purple-400', // Elara
    2: 'border-teal-400', // Kai
    3: 'border-green-500', // Orion
    4: 'border-orange-400', // Aethel
  };

  return (
    <button onClick={() => onSelect(guide.id)} className={`${baseClasses} ${activeClasses}`}>
      <div className={`w-8 h-8 rounded-full mr-4 border-2 ${avatarColors[guide.id] || 'border-gray-300'}`}></div>
      <span className="font-medium flex-grow">{guide.guideName}</span>
      {/* Show star for premium/special guides */}
      {guide.id === 4 && <FaStar className="w-4 h-4 text-yellow-500 fill-current" />}
    </button>
  );
};

// The container for the list
const GuideList = ({ guides, activeGuideId, onSelectGuide }) => {
  return (
    <div className="w-full md:w-1/3 p-4 border border-gray-200 rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-1 text-gray-800">Meet Your Guides</h2>
      <p className="text-gray-500 mb-4 text-sm">Discover their stories and choose your companion for reflection.</p>
      <div className="space-y-2">
        {guides.map((guide) => (
          <GuideListItem
            key={guide.id}
            guide={guide}
            isActive={guide.id === activeGuideId}
            onSelect={onSelectGuide}
          />
        ))}
      </div>
    </div>
  );
};

export default GuideList;
