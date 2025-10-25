import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { guidesData, moods } from '../../data';
import { WandIcon, MicIcon, ImageIcon } from '../../assets/icons';
// --- We NO LONGER import Sidebar ---
import { useCreateJournalEntryMutation, useGetReflectionMutation } from '../../apis/journalApiSlice';

// --- We now accept 'onClose' as a prop ---
const Journal = ({ onClose }) => { 
    const navigate = useNavigate();
    const location = useLocation();
    const guideId = location.state?.guideId || guidesData[0].id;

    const selectedGuide = guidesData.find(g => g.id == guideId) || guidesData[0];

    const [journalText, setJournalText] = useState('');
    const [reflections, setReflections] = useState([]);
    const [selectedMood, setSelectedMood] = useState(null);

    const [createJournalEntry, { isLoading: isSaving }] = useCreateJournalEntryMutation();
    const [getReflection, { isLoading: isReflecting }] = useGetReflectionMutation();

    const [activeGuide, setActiveGuide] = useState(selectedGuide);
    const wordCount = journalText.split(/\s+/).filter(Boolean).length;

    const handleGetReflection = async () => {
      if (!journalText) {
        alert('Please write something in your journal first.');
        return;
      }
      try {
        const result = await getReflection({
          content: journalText,
          guideId: activeGuide.id,
        }).unwrap();
        const newText = result.reflection;
        const newReflection = { 
          id: Date.now(), 
          guide: activeGuide, 
          text: newText, 
        };
        setReflections(prev => [newReflection, ...prev]);
      } catch (err) {
        console.error("Failed to get reflection: ", err);
        alert(err.data?.message || "Failed to get reflection. Please try again.");
      }
    };

    const handleSaveEntry = async () => {
      if (!journalText || !selectedMood) {
        alert("Please write your journal entry and select a mood.");
        return;
      }

      try {
        await createJournalEntry({
          content: journalText,
          mood: selectedMood,
          reflections: reflections.map(r => ({
            guideId: r.guide.id,
            guideName: r.guide.name,
            text: r.text,
          })),
        }).unwrap();

        // --- THIS IS THE CHANGE ---
        onClose(); // Close the modal instead of navigating

      } catch (err) {
        console.error("Failed to save entry: ", err);
        alert(err.data?.message || "Failed to save entry. Please try again.");
      }
    };

    // --- THE JSX IS NOW SIMPLIFIED (no Sidebar, no main layout) ---
    return (
      // The modal provides the padding, so we just add the content
      <div className="h-full flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">How was your day?</h1>

        <div className="bg-white rounded-2xl flex-grow flex flex-col">
          <textarea 
            className="w-full h-48 p-4 bg-stone-50 border rounded-lg resize-none focus:outline-none focus:ring-2 text-base leading-relaxed border-stone-200 focus:ring-teal-500" 
            placeholder="Let your thoughts flow freely..." 
            value={journalText} 
            onChange={(e) => setJournalText(e.target.value)} 
          ></textarea>

          <div className="text-right text-sm font-semibold mt-2">
            <span className="text-slate-500">{wordCount} words</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 p-4 bg-stone-50 rounded-lg">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-slate-600">Mood:</label>
              {moods.map(mood => (
                <button 
                  key={mood.name} 
                  onClick={() => setSelectedMood(mood.name)} 
                  className={`text-2xl rounded-full transition-all ${selectedMood === mood.name ? `ring-2 ring-offset-1 p-1 ${mood.color}` : 'hover:scale-110'}`}
                >
                  {mood.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-4 mt-4">
            <select value={activeGuide.id} onChange={(e) => setActiveGuide(guidesData.find(g => g.id == e.target.value))} className="bg-white border border-stone-300 rounded-lg p-2 font-semibold focus:ring-2 focus:ring-teal-500">
              {guidesData.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <button 
              onClick={handleGetReflection} 
              disabled={isReflecting || !journalText}
              className="bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <WandIcon className="w-5 h-5" /> 
              {isReflecting ? 'Thinking...' : (reflections.length > 0 ? 'Get Another' : 'Get Reflection')}
            </button>
          </div>
        </div>

        <div className="space-y-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {reflections.map(r => (
            <div key={r.id} className={`p-5 rounded-xl shadow-lg ${r.guide.color} ${r.guide.textColor}`}>
              <span className="font-bold text-sm">{r.guide.name} says:</span>
              <p className="mt-1">{r.text}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={handleSaveEntry} 
          disabled={isSaving || reflections.length === 0 || !selectedMood}
          className="w-full max-w-md mx-auto bg-slate-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        > 
          {isSaving ? "Saving..." :
            (reflections.length === 0 ? "Get a Reflection to Save" : 
            (!selectedMood ? "Please Select a Mood" : "Save & Finish Entry")
            )
          } 
        </button>
      </div>
    );
};

export default Journal;