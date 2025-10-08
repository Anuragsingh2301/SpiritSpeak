import React from 'react';
import { leagueData } from '../../data';

export function LeagueRoadmap({ currentUserXP }) {
    const currentLeagueIndex = leagueData.slice().reverse().findIndex(l => currentUserXP >= l.xp);
    const currentLeague = leagueData[leagueData.length - 1 - currentLeagueIndex];
    const nextLeague = leagueData[leagueData.length - currentLeagueIndex];

    let progressPercent = 0;
    if (currentLeague && nextLeague) {
        const xpInLeague = currentUserXP - currentLeague.xp;
        const xpForNext = nextLeague.xp - currentLeague.xp;
        progressPercent = (xpInLeague / xpForNext) * 100;
    }

    return (
        <div className="relative pl-8">
            {leagueData.map((league, index) => {
                const isCompleted = currentUserXP >= league.xp;
                const isCurrent = currentLeague && currentLeague.name === league.name;
                return (
                    <div key={league.name} className="relative mb-10">
                        {index < leagueData.length - 1 && <div className="absolute left-5 top-12 -ml-px mt-1 w-0.5 h-12 bg-slate-300"></div>}
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ring-4 ${isCompleted ? 'bg-teal-500 ring-teal-200 text-white' : 'bg-slate-200 ring-slate-100'}`}>
                                {league.icon}
                            </div>
                            <div>
                                <h3 className={`font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>{league.name}</h3>
                                <p className="text-sm text-slate-500">{league.xp.toLocaleString()} XP</p>
                            </div>
                        </div>
                        {isCurrent && nextLeague && (
                            <div className="mt-2 pl-14">
                                <div className="w-full bg-slate-200 rounded-full h-2.5">
                                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <p className="text-xs text-right text-slate-500 mt-1">{currentUserXP.toLocaleString()} / {nextLeague.xp.toLocaleString()} XP</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};