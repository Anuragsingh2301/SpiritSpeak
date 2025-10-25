import { TbBrandTorchain } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useGetGuideLoreQuery } from '../../../apis/guidesApiSlice';

const GuideDetail = ({ guide }) => {
  const navigate = useNavigate();
  
  const { 
    data: loreData, 
    isLoading: isLoadingLore, 
    isError 
  } = useGetGuideLoreQuery(guide?.id, {
    skip: !guide, 
  });

  // Simple map to get the image filename
  const imageMap = {
    1: 'elara.jpg',
    2: 'kai.jpg',
    3: 'orion.jpg',
    4: 'aethel.jpg',
  };
  // This path is now confirmed to be correct!
  const imageUrl = `/guides/${imageMap[guide.id]}`;

  if (!guide) {
    return (
      <div className="w-full md:w-2/3 p-8 flex items-center justify-center bg-gray-50 rounded-xl">
        <p className="text-gray-500">Select a guide from the list to see their details.</p>
      </div>
    );
  }

  const handleChatClick = () => {
    navigate('/dashboard', { 
      state: { 
        openJournal: true,
        guideId: guide.id 
      } 
    });
  };

  return (
    <div className={`w-full md:w-2/3 p-8 rounded-xl ${guide.colorPalette.cardBg}`}>
      
      <div className={`mb-6 relative aspect-square w-full rounded-xl overflow-hidden shadow-md ${guide.colorPalette.cardBg}`}>
        <img
          src={imageUrl} 
          alt={guide.guideName}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
          <h2 className="text-3xl font-bold text-white mb-1">{guide.guideName}</h2>
        </div>
      </div>
      
      {/* This <p> tag is now correct (no </pre>) */}
      <p className="text-gray-600 mb-6 text-justify">
          {guide.detailedBio}
      </p>
      
      {/* Chapter Card */}
      <div className={`p-4 rounded-lg mb-4 text-blue-900 ${guide.colorPalette.cardBg}`}>
        {isLoadingLore ? (
          <p>Loading today's chapter...</p>
        ) : isError ? (
          <p className="text-red-500">Could not load chapter. Please try again.</p>
        ) : loreData ? (
          <>
            <h3 className="font-bold">{loreData.title}</h3>
            <p className="my-2 text-sm whitespace-pre-wrap">{loreData.story}</p>
            {/* --- THIS IS THE FINAL FIX --- */}
            <p className="text-sm italic">{loreData.prompt}</p>
          </>
        ) : null}
      </div>

      {/* Chat Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={handleChatClick}
          className={`font-bold py-2 px-6 rounded-full flex items-center justify-center gap-2 mx-auto shadow-sm hover:bg-green-200 transition-colors ${guide.colorPalette.widgetBg}`}>
          <TbBrandTorchain className="w-5 h-5" />
          Chat with {guide.guideName}
        </button>
      </div>
    </div>
  );
};

export default GuideDetail;