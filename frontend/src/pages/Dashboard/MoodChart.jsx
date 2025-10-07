import React from 'react';
import { moodHistory } from '../../data';

export default function MoodChart() {
    const moodToY = { Sad: 90, Anxious: 75, Okay: 50, Calm: 25, Happy: 10 };
    const moodToColor = { Sad: '#9ca3af', Anxious: '#a855f7', Okay: '#facc15', Calm: '#3b82f6', Happy: '#22c55e' };
    const points = moodHistory.map((item, i) => item.mood ? `${i * 16.66},${moodToY[item.mood]}` : null).filter(Boolean);
    const pathData = "M " + points.join(" L ");

    return (
        <div className="h-32 w-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d={pathData} fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {moodHistory.map((item, i) => {
                    if (!item.mood) return null;
                    return <circle key={i} cx={i * 16.66} cy={moodToY[item.mood]} r="2" fill={moodToColor[item.mood]} stroke="white" strokeWidth="1" />;
                })}
            </svg>
            <div className="flex justify-between text-xs font-bold text-slate-500 mt-1">
                {moodHistory.map(item => <span key={item.day}>{item.day}</span>)}
            </div>
        </div>
    );
};
