import { useState } from 'react';

import GuideList from './components/GuideList';
import GuideDetail from './components/GuideDetail';
import { guideInfo } from './components/GuideData';
import Sidebar from '../Sidebar/Sidebar';

const Guide = () => {
  // Set the initial active guide to Kai (ID: 2) to match the image
  const [activeGuideId, setActiveGuideId] = useState(2);

  // Find the full object for the active guide
  const activeGuide = guideInfo.find((g) => g.id === activeGuideId);

  return (
    <div className="flex min-h-screen bg-stone-100">
            <Sidebar />
      <main className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm my-4 p-6 flex flex-col md:flex-row gap-6">
        <GuideList
          guides={guideInfo}
          activeGuideId={activeGuideId}
          onSelectGuide={setActiveGuideId}
        />
        <GuideDetail guide={activeGuide} />
      </main>
    </div>
  );
};

export default Guide;
