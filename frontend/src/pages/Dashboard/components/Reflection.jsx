const Reflection = ({ guide, onClick }) => { // <-- 1. Accept onClick
  const { 
    guideName, 
    text, 
    timestamp, 
    guideColor,
    titleColor,
  } = guide; 

  return (
    // --- 2. ADD onClick and cursor-pointer ---
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg transition-shadow duration-300 hover:shadow-md ${guideColor} text-gray-800 cursor-pointer`}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className={`font-semibold ${titleColor}`}>
          {guideName}
        </h3>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>

      <p className="text-sm text-gray-700">
        {text}
      </p>
    </div>
  );
};

export default Reflection;