import React from 'react';
import Reflection from './Reflection'; 
import MoodChart from './MoodChart';
import Sidebar from '../Sidebar/Sidebar'; 
import {  reflections, entries, thoughts, guideInfo  } from "../Guide/components/GuideData";
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

// --- DATA MERGING FUNCTION ---

// Streak and Thought Widget
const mergeReflectionData = (reflectionsArray, guideInfo) => {
    return reflectionsArray.map(reflection => {
        const guideDetail = guideInfo.find(info => info.guideName === reflection.guideName);
        return {
            ...reflection,
            guideDescription: reflection.summary, 
            guideColor: guideDetail ? guideDetail.colorPalette.cardBg : 'bg-gray-100',
            titleColor: guideDetail ? guideDetail.colorPalette.titleColor : 'text-gray-800',
        };
    });
};

// --- Helper Components (PastEntries and PremiumUpgrade) remain the same ---
// Note: ThoughtWidget is simplified below to avoid needing the external guideInfo lookup

// Thought Widget (Simplified)
// Thought Widget (Simplified, but now with color lookup)
const ThoughtWidget = ({ thought, guideInfo }) => { // 👈 ADDED guideInfo prop
    if (!thought) return null;

    // 1. Find the corresponding guide detail
    const guideDetail = guideInfo.find(info => info.guideName === thought.guide);

    // 2. Determine the background class using widgetBg
    const colorClass = guideDetail 
        ? guideDetail.colorPalette.widgetBg 
        : 'bg-purple-700 text-white'; // Default fallback

    // Use the determined class string for dynamic styling
    const widgetClasses = `p-6 rounded-xl shadow-lg ${colorClass}`;

    return (
        <div className={widgetClasses}>
            <h3 className="text-xl font-bold opacity-80 mb-2">A Thought from {thought.guide.split(',')[0]}</h3>
           <p className="text-sm font-light italic">"{thought.quote}"</p>
        </div>
    );
};

// Past Entries Widget
const PastEntries = () => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">Past Entries</h3>
        
        {entries.slice(0, 2).map((entry, index) => (
             <div key={index} className="text-sm">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <p className="font-medium">{entry.date}</p>
                    <p>{entry.time}</p>
                </div>
                <p className="text-gray-700 leading-snug">{entry.text}</p>
            </div>
        ))}
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
    const navigate = useNavigate();

    // 1. Logic for Random Reflections (Memoized)
    const mergedReflections = useMemo(() => {
        const selectedReflections = [];
        const reflectionIndices = [];
        
        // Select 2 unique random indices using Math.random
        while (reflectionIndices.length < 2 && reflections.length >= 2) {
            const randomIndex = Math.floor(Math.random() * reflections.length);
            if (!reflectionIndices.includes(randomIndex)) {
                reflectionIndices.push(randomIndex);
                selectedReflections.push(reflections[randomIndex]);
            }
        }
        
        // Merge the selected data with guide colors
        return mergeReflectionData(selectedReflections, guideInfo);
    }, [reflections, guideInfo]); // Depend on data arrays

    // 2. Logic for Random Thought (Memoized)
    const currentThought = useMemo(() => {
        if (thoughts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * thoughts.length);
        return thoughts[randomIndex];
    }, [thoughts]);

    const handleWriteEntryClick = () => {
        navigate('/journal');
    };

    return (
        <div className="flex min-h-screen bg-[#f0efeb]">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex">
                    
                    {/* 1. LEFT COLUMN */}
                    <div className="w-2/3 pr-10 space-y-6">
                        
                        <h1 className="text-3xl font-bold text-gray-900">Hello!</h1>
                        <p className="text-gray-500 mb-6">Welcome back to your space.</p>
                        
                        
                        {/* RECENT REFLECTIONS CONTAINER (White Box) */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4">
                            
                            <h2 className="text-xl font-semibold text-gray-800">Recent Reflections</h2>
                            
                            <div className="space-y-4">
                                {/* Renders the 2 randomly selected reflections */}
                                {mergedReflections.map((reflection) => (
                                    <Reflection 
                                        key={reflection.id} 
                                        guide={reflection} // Passed to Reflection.jsx
                                    />
                                ))}
                            </div>
                            
                            {/* Button to navigate to the journal route */}
                            <div className="mt-28 w-full pt-4">
                                <button 
                                    onClick={() => navigate('/journal')} 
                                    className="w-full py-3 text-lg font-semibold text-white bg-[#14B7A5] rounded-lg shadow-md hover:bg-[#11A697] transition-colors"
                                >
                                    Write Today's Entry
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* 2. RIGHT COLUMN */}
                    <div className="w-1/3 space-y-6">
                        
                        {/* Streak Badge */}
                        <div className="flex justify-end">
                            <span className="text-sm font-semibold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full flex items-center shadow-sm">
                                <span className="mr-1 text-base">🔥</span> 7 Day Streak
                            </span>
                        </div>
                        
                        {/* RENDER RANDOM THOUGHT WIDGET */}
                        <ThoughtWidget thought={currentThought} guideInfo={guideInfo} />   

                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Mood Overview</h2>
                            <MoodChart />
                        </div>                     
                        {/* Past Entries */}
                        <PastEntries />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;