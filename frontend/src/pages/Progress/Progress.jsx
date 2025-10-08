import React from 'react';
import { quests, achievements } from '../../data';
import { CheckCircleIcon, XPIcon } from '../../assets/icons';
import { LeagueRoadmap } from './LeagueRoadmap';
import Sidebar from '../Sidebar/Sidebar';

const QuestItem = ({ quest }) => (
    <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-between transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-4">
            {quest.completed ? <CheckCircleIcon className="text-green-500 w-6 h-6 flex-shrink-0" /> : <div className="w-6 h-6 rounded-full bg-purple-200 flex-shrink-0 border-2 border-purple-300"></div>}
            <div>
                <p className={`font-semibold ${quest.completed ? 'text-slate-500 line-through' : 'text-purple-800'}`}>{quest.title}</p>
            </div>
        </div>
        <div className="flex items-center gap-1 font-bold text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full">
            <XPIcon className="w-4 h-4" />
            <span>{quest.xp}</span>
        </div>
    </div>
);

export default function ProgressPage() {
    const currentUserXP = 4585;
    return (
        <div className="flex min-h-screen bg-[#f0efeb]">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="h-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Progress</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h2 className="font-bold text-2xl mb-4 text-purple-700">Daily & Weekly Quests</h2>
                                <div className="space-y-4">
                                    {quests.daily.map(q => <QuestItem key={q.id} quest={q} />)}
                                    {quests.weekly.map(q => <QuestItem key={q.id} quest={q} />)}
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h2 className="font-bold text-2xl mb-4 text-amber-700">Achievements</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                    {achievements.map(ach => (
                                        <div key={ach.id} className={`p-4 rounded-xl flex flex-col items-center justify-center aspect-square transition-all ${ach.unlocked ? 'bg-amber-100 ring-2 ring-amber-200' : 'bg-stone-100 opacity-70'}`}>
                                            <span className="text-4xl">{ach.icon}</span>
                                            <p className="text-sm font-semibold mt-2 text-slate-600">{ach.title}</p>
                                            {ach.unlocked && <div className="flex items-center gap-1 font-bold text-yellow-600 text-xs mt-1"> <XPIcon className="w-3 h-3" /> <span>{ach.xp}</span> </div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
                            <h2 className="font-bold text-2xl mb-6 text-indigo-700">League Journey</h2>
                            <LeagueRoadmap currentUserXP={currentUserXP} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};