const Reflection = ({ guide }) => {
  const { 
    // All properties are now destructured directly from the 'guide' object
    guideName, 
    guideDescription, 
    timestamp, 
    guideColor,   // Renamed from cardBg to guideColor for clarity in merge function
    titleColor,
  } = guide; 


  return (
    // 👇 Apply dynamic background color (using guideColor)
    <div className={`p-4 rounded-lg transition-shadow duration-300 hover:shadow-md ${guideColor} text-gray-800`}>
      
      {/* Header and Timestamp */}
      <div className="flex justify-between items-start mb-1">
        {/* 👇 Apply dynamic title color */}
        <h3 className={`font-semibold ${titleColor}`}>
          {guideName}
        </h3>
        {/* Use the timestamp from the top-level object */}
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>

      {/* Reflection content */}
      <p className="text-sm text-gray-700">
        {guideDescription}
      </p>
    </div>
  );
};

export default Reflection;