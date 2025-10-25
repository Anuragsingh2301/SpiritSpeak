import { useState } from 'react';
import GuideList from './components/GuideList';
import GuideDetail from './components/GuideDetail';
import { guideInfo } from './components/GuideData';
import Sidebar from '../Sidebar/Sidebar';

const Guide = () => {
  const [activeGuideId, setActiveGuideId] = useState(2);
  const activeGuide = guideInfo.find((g) => g.id === activeGuideId);

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