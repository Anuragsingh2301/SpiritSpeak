import { TbBrandTorchain } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const GuideDetail = ({ guide }) => {
  // A guard clause for when no guide is selected

  const navigate = useNavigate();
  if (!guide) {
    return (
      <div className="w-full md:w-2/3 p-8 flex items-center justify-center bg-gray-50 rounded-xl">
        <p className="text-gray-500">Select a guide from the list to see their details.</p>
      </div>
    );
  }

  // Static data based on the image for demonstration
  const chapterDetails = {
    title: "Today's Chapter: The Unmovable Rock",
    description: "Kai learned his first lesson not from a person, but from a single rock on the coast...",
    prompt: `"What is one 'wave' you endured today...?"`,
  };

  return (
    <div className={`w-full md:w-2/3 p-8 rounded-xl ${guide.colorPalette.cardBg}`}>
      {/* Guide Header */}
      <div className="flex items-start mb-6">
        <div className="relative w-20 h-20 flex-shrink-0 mr-6">
          <div className="absolute inset-0 rounded-full bg-white border-[6px] border-teal-300"></div>
          <div className="absolute inset-2 rounded-full bg-teal-300"></div>
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${guide.colorPalette.titleColor}`}>{guide.guideName}</h2>
          <p className="text-gray-600 mt-1">
            {guide.detailedBio}
          </p>
        </div>
      </div>

      {/* Chapter Card */}
      <div className={`p-4 rounded-lg mb-4 text-blue-900 ${guide.colorPalette.cardBg}`}>
        <h3 className="font-bold">{chapterDetails.title}</h3>
        <p className="my-2 text-sm">{chapterDetails.description}</p>
        <p className="text-sm italic">{chapterDetails.prompt}</p>
      </div>

      {/* Active Companion Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => {
            // Map guide names to IDs from data.js
            const guideId = guide.id
            navigate('/journal', { state: { guideId } });
          }}
          className={`font-bold py-2 px-6 rounded-full flex items-center justify-center gap-2 mx-auto shadow-sm hover:bg-green-200 transition-colors ${guide.colorPalette.widgetBg}`}>
          <TbBrandTorchain className="w-5 h-5" />
          Chat with {guide.guideName}
        </button>
      </div>
    </div>
  );
};

export default GuideDetail;
