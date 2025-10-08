import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { guidesData, moods } from '../../data';
import { WandIcon, MicIcon, ImageIcon } from '../../assets/icons';
import Sidebar from '../Sidebar/Sidebar';

const Journal = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const guideId = location.state?.guideId || guidesData[0].id;

    // Find the actual guide object based on the ID
    const selectedGuide = guidesData.find(g => g.id === guideId) || guidesData[0];

    const [journalText, setJournalText] = useState('');
    const [reflections, setReflections] = useState([]);
    const [selectedMood, setSelectedMood] = useState(null);
    const [activeGuide, setActiveGuide] = useState(selectedGuide);
    const wordCount = journalText.split(/\s+/).filter(Boolean).length;

    console.log("Active Guide:", activeGuide);

    const handleGetReflection = () => {
        const mockReflections = { 
            kai: "It sounds like today held a mix of challenges and small victories...", 
            elara: "Your words paint such a vivid picture of your day! It's like you're weaving a tapestry of experiences...", 
            orion: "Analyzing the events of your day, a clear pattern emerges around your reactions...", 
            aethel: "The feelings you describe today are like leaves on a branch; let's look at the root they grew from..." 
        };
        const newReflection = { 
            id: Date.now(), 
            guide: activeGuide, 
            text: mockReflections[activeGuide.id] || mockReflections.kai 
        };
        setReflections(prev => [newReflection, ...prev]);
    };

    return (
      <div className="flex min-h-screen bg-stone-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="p-4 md:p-0 h-full flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-center">How was your day?</h1>
            <div className="bg-white p-6 rounded-2xl shadow-lg flex-grow flex flex-col">
              <textarea className="w-full h-48 p-4 bg-stone-50 border rounded-lg resize-none focus:outline-none focus:ring-2 text-base leading-relaxed border-stone-200 focus:ring-teal-500" placeholder="Let your thoughts flow freely..." value={journalText} onChange={(e) => setJournalText(e.target.value)} ></textarea>
              
              <div className="text-right text-sm font-semibold mt-2">
                <span className="text-slate-500">{wordCount} words</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 p-4 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <label className="font-semibold text-slate-600">Mood:</label>
                  {moods.map(mood => (<button key={mood.name} onClick={() => setSelectedMood(mood.name)} className={`text-2xl rounded-full transition-all ${selectedMood === mood.name ? `ring-2 ring-offset-1 p-1 ${mood.color}` : 'hover:scale-110'}`}>{mood.icon}</button>))}
                </div>
                {/* Note: Mic and Image buttons can remain as placeholders for future features */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors"><MicIcon className="w-5 h-5" /></button>
                  <button className="p-2 rounded-lg bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors"><ImageIcon className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-4 mt-4">
                <select value={activeGuide.id} onChange={(e) => setActiveGuide(guidesData.find(g => g.id === e.target.value))} className="bg-white border border-stone-300 rounded-lg p-2 font-semibold focus:ring-2 focus:ring-teal-500">
                  {guidesData.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                <button onClick={handleGetReflection} className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition-all transform hover:scale-105 flex items-center gap-2">
                  <WandIcon className="w-5 h-5" /> Get {reflections.length > 0 ? 'Another' : ''} Reflection
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {reflections.map(r => (<div key={r.id} className={`p-5 rounded-xl shadow-lg ${r.guide.color} ${r.guide.textColor}`}><span className="font-bold text-sm">{r.guide.name} says:</span><p className="mt-1">{r.text}</p></div>))}
            </div>
            <button onClick={() => navigate('/dashboard')} className="w-full max-w-md mx-auto bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-slate-800"> Save & Finish Entry </button>
          </div>
        </main>
      </div>
    );
};

export default Journal;

