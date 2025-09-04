// src/components/JourneyStats.jsx

const JourneyStats = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Your Journey</h2>
      <div className="flex justify-around text-center border-b pb-4 mb-4">
        <div>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500">Reflections</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500">Active Days</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Favorite Guide</p>
        <p className="font-bold text-gray-800">Athena the Wise</p>
      </div>
    </div>
  );
};

export default JourneyStats;