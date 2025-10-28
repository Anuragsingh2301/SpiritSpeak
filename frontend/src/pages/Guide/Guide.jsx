import { useState } from 'react';
import GuideList from './components/GuideList';
import GuideDetail from './components/GuideDetail';
import { useGetAllGuidesQuery } from '../../apis/guidesApiSlice';
import Sidebar from '../Sidebar/Sidebar';
import LoadingScreen from '../../components/LoadingScreen';

const Guide = () => {
  const [activeGuideId, setActiveGuideId] = useState(2);
  
  // Fetch guides from backend
  const { data: guidesResponse, isLoading, isError } = useGetAllGuidesQuery();
  const guideInfo = guidesResponse?.data || [];
  
  const activeGuide = guideInfo.find((g) => g.id === activeGuideId);

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f0efeb]">
        <Sidebar />
        <main className="flex-1 p-8">
          <LoadingScreen />
        </main>
      </div>
    );
  }

  if (isError || guideInfo.length === 0) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f0efeb]">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="text-center text-red-500">
            <p>Unable to load guides. Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0efeb]">
      <Sidebar />

      {/* This <main> tag now handles scrolling, just like your dashboard */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* This div is the white card that holds your content */}
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
          <GuideList
            guides={guideInfo}
            activeGuideId={activeGuideId}
            onSelectGuide={setActiveGuideId}
          />
          <GuideDetail guide={activeGuide} />
        </div>
      </main>

    </div>
  );
};

export default Guide;