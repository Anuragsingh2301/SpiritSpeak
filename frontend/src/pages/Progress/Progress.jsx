import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleIcon, XPIcon } from '../../assets/icons';
import { LeagueRoadmap } from './LeagueRoadmap';
import Sidebar from '../Sidebar/Sidebar';
import { 
  useGetXPDataQuery, 
  useCompleteQuestMutation, 
  useInitializeXPMutation,
  useResetQuestsMutation 
} from '../../apis/xpApiSlice';
import { setXPData } from '../../features/xpSlice';

// Default quests to show if backend doesn't return any
const DEFAULT_DAILY_QUESTS = [
  { id: 'daily_1', title: 'Write one journal entry', xp: 20, completed: false, type: 'journal_entry' },
  { id: 'daily_2', title: 'Log your mood today', xp: 5, completed: false, type: 'mood_log' },
  { id: 'daily_3', title: 'Daily login bonus', xp: 10, completed: false, type: 'daily_login' },
];

const DEFAULT_WEEKLY_QUESTS = [
  { id: 'weekly_1', title: 'Journal 5 days this week', xp: 100, completed: false, type: 'journal_5_days', progress: 0, target: 5 },
  { id: 'weekly_2', title: 'Try a new guide', xp: 50, completed: false, type: 'new_guide' },
  { id: 'weekly_3', title: 'Log your mood 5 times', xp: 25, completed: false, type: 'mood_5_times', progress: 0, target: 5 },
  { id: 'weekly_4', title: 'Use a guide for 3 days', xp: 75, completed: false, type: 'guide_3_days', progress: 0, target: 3 },
];

const DEFAULT_ACHIEVEMENTS = [
  { id: 'ach_1', title: 'Journaling Initiate', icon: '🌟', xp: 50, unlocked: false, condition: 'first_journal' },
  { id: 'ach_2', title: '7-Day Streak', icon: '🔥', xp: 100, unlocked: false, condition: '7_day_streak' },
  { id: 'ach_3', title: '30-Day Streak', icon: '🚀', xp: 500, unlocked: false, condition: '30_day_streak' },
  { id: 'ach_4', title: 'Reflective Mind', icon: '🧠', xp: 200, unlocked: false, condition: '50_journals' },
  { id: 'ach_5', title: 'Guide Seeker', icon: '🧭', xp: 100, unlocked: false, condition: '10_guides' },
  { id: 'ach_6', title: 'Mood Mapper', icon: '🎨', xp: 100, unlocked: false, condition: '20_moods' },
];

const QuestItem = ({ quest, questType, onComplete }) => {
    const handleClick = () => {
        if (!quest.completed) {
            onComplete(quest.id, questType, quest.xp);
        }
    };

    const isCompleted = quest.completed;

    return (
        <div 
            className={`p-4 rounded-lg flex items-center justify-between transition-all ${
                isCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md' 
                    : 'bg-purple-50 border-2 border-purple-200 hover:shadow-md hover:scale-[1.02] cursor-pointer hover:border-purple-400'
            }`}
            onClick={handleClick}
            title={!isCompleted ? 'Click to complete this quest' : 'Quest completed!'}
        >
            <div className="flex items-center gap-4 flex-1">
                {isCompleted ? (
                    <div className="relative">
                        <CheckCircleIcon className="text-green-600 w-8 h-8 flex-shrink-0 animate-pulse" />
                        <span className="absolute -top-1 -right-1 text-xs">✓</span>
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-300 flex-shrink-0 border-2 border-purple-400 hover:bg-purple-400 transition-colors"></div>
                )}
                <div className="flex-1">
                    <p className={`font-semibold ${isCompleted ? 'text-green-800' : 'text-purple-900'}`}>
                        {quest.title}
                        {isCompleted && <span className="ml-2 text-green-600 text-sm font-bold">✓ COMPLETED</span>}
                    </p>
                    {/* Only show progress bar for weekly quests */}
                    {quest.progress !== undefined && questType === 'weekly' && (
                        <div className="mt-1">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[200px]">
                                    <div 
                                        className={`h-2 rounded-full transition-all ${
                                            isCompleted ? 'bg-green-500' : 'bg-purple-500'
                                        }`}
                                        style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                                    ></div>
                                </div>
                                <p className={`text-xs font-medium ${
                                    isCompleted ? 'text-green-700' : 'text-gray-600'
                                }`}>
                                    {quest.progress}/{quest.target}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`flex items-center gap-1 font-bold px-3 py-1.5 rounded-full ${
                isCompleted ? 'text-green-700 bg-green-200 border-2 border-green-400' : 'text-yellow-600 bg-yellow-100'
            }`}>
                <XPIcon className="w-4 h-4" />
                <span>{quest.xp} XP</span>
            </div>
        </div>
    );
};

export default function ProgressPage() {
    const dispatch = useDispatch();
    
    // Get XP data from Redux store
    const xpData = useSelector((state) => state.xp);
    
    // API hooks
    const { data: xpApiData, isLoading, refetch } = useGetXPDataQuery();
    const [initializeXP] = useInitializeXPMutation();
    const [completeQuestMutation] = useCompleteQuestMutation();
    const [resetQuests] = useResetQuestsMutation();

    // Initialize XP system and sync with Redux on mount
    useEffect(() => {
        const initializeAndSync = async () => {
            try {
                // Always initialize first to ensure data exists
                const initResult = await initializeXP().unwrap();
                console.log('Initialize result:', initResult);
                
                if (initResult.success) {
                    dispatch(setXPData(initResult.data));
                }

                // Reset quests if needed (daily/weekly)
                await resetQuests();
                
                // Refetch to get the latest data
                const result = await refetch();
                if (result.data?.success) {
                    dispatch(setXPData(result.data.data));
                }
            } catch (error) {
                console.error('Failed to initialize XP system:', error);
                // Try to refetch even if initialization fails (user might already have data)
                try {
                    const result = await refetch();
                    if (result.data?.success) {
                        dispatch(setXPData(result.data.data));
                    }
                } catch (refetchError) {
                    console.error('Failed to refetch:', refetchError);
                }
            }
        };

        initializeAndSync();
    }, [dispatch, initializeXP, refetch, resetQuests]);

    // Handle quest completion
    const handleCompleteQuest = async (questId, questType, xp) => {
        try {
            console.log('🎯 Attempting to complete quest:', { questId, questType, xp });
            
            const result = await completeQuestMutation({ questId, questType }).unwrap();
            
            if (result.success) {
                console.log('✅ Quest completed successfully! Backend response:', result.data);
                
                // Update Redux store with complete data from backend
                dispatch(setXPData({
                    totalXP: result.data.totalXP,
                    quests: result.data.quests,
                    achievements: result.data.achievements,
                    currentLevel: result.data.currentLevel
                }));
                
                // Show success notification
                console.log(`🎉 Quest completed! +${xp} XP | New Total: ${result.data.totalXP} XP`);
                alert(`🎉 Quest Completed!\n\n+${xp} XP Earned!\n\nNew Total: ${result.data.totalXP} XP`);
                
                // Force a refetch to ensure UI is in sync
                await refetch();
            }
        } catch (error) {
            console.error('❌ Failed to complete quest:', error);
            
            // Show user-friendly error message
            const errorMessage = error?.data?.message || 'Failed to complete quest';
            const requirement = error?.data?.requirement || '';
            
            alert(`⚠️ Quest Not Complete\n\n${errorMessage}\n${requirement ? '\n' + requirement : ''}`);
        }
    };

    // Use Redux data, fallback to API data, then fallback to defaults
    const currentUserXP = xpData.totalXP || xpApiData?.data?.totalXP || 0;
    const dailyQuests = (xpData.quests?.daily && xpData.quests.daily.length > 0) 
        ? xpData.quests.daily 
        : (xpApiData?.data?.quests?.daily && xpApiData.data.quests.daily.length > 0)
            ? xpApiData.data.quests.daily
            : DEFAULT_DAILY_QUESTS;
    
    const weeklyQuests = (xpData.quests?.weekly && xpData.quests.weekly.length > 0) 
        ? xpData.quests.weekly 
        : (xpApiData?.data?.quests?.weekly && xpApiData.data.quests.weekly.length > 0)
            ? xpApiData.data.quests.weekly
            : DEFAULT_WEEKLY_QUESTS;
    
    const achievements = (xpData.achievements && xpData.achievements.length > 0)
        ? xpData.achievements
        : (xpApiData?.data?.achievements && xpApiData.data.achievements.length > 0)
            ? xpApiData.data.achievements
            : DEFAULT_ACHIEVEMENTS;

    // Calculate quest statistics
    const completedDailyQuests = dailyQuests.filter(q => q.completed).length;
    const completedWeeklyQuests = weeklyQuests.filter(q => q.completed).length;
    const unlockedAchievements = achievements.filter(a => a.unlocked).length;

    // Debug logging
    console.log('XP Data:', { currentUserXP, dailyQuests, weeklyQuests, achievements, xpData, xpApiData });

    if (isLoading) {
        return (
            <div className="flex h-screen overflow-hidden bg-[#f0efeb]">
                <Sidebar />
                <main className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
                    <p className="text-xl text-gray-600">Loading your progress...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#f0efeb]">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="h-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Progress</h1>
                    
                    {/* Progress Summary Card */}
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg mb-8">
                        <div className="flex items-center justify-center gap-3">
                            <XPIcon className="w-10 h-10" />
                            <div className="text-center">
                                <p className="text-5xl font-bold">{currentUserXP.toLocaleString()}</p>
                                <p className="text-teal-100 text-sm font-medium mt-1">Total XP</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-bold text-2xl text-purple-700">Quests</h2>
                                </div>
                                
                                <div className="space-y-6">
                                    {/* Daily Quests */}
                                    <div>
                                        <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <span className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded text-xs">Daily</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {dailyQuests.map(q => (
                                                <QuestItem 
                                                    key={q.id} 
                                                    quest={q} 
                                                    questType="daily"
                                                    onComplete={handleCompleteQuest}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Weekly Quests */}
                                    <div>
                                        <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <span className="bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded text-xs">Weekly</span>
                                        </h3>
                                        <div className="space-y-3">
                                            {weeklyQuests.map(q => (
                                                <QuestItem 
                                                    key={q.id} 
                                                    quest={q} 
                                                    questType="weekly"
                                                    onComplete={handleCompleteQuest}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-2xl text-amber-700">Achievements</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {achievements.map(ach => (
                                        <div 
                                            key={ach.id} 
                                            className={`p-4 rounded-xl flex flex-col items-center justify-between aspect-square transition-all relative ${
                                                ach.unlocked 
                                                    ? 'bg-gradient-to-br from-amber-100 to-yellow-100 ring-2 ring-amber-300 shadow-lg' 
                                                    : 'bg-stone-100 opacity-60 grayscale hover:opacity-80 hover:grayscale-0 transition-all'
                                            }`}
                                        >
                                            {ach.unlocked && (
                                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                                    <CheckCircleIcon className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            
                                            {/* Top section - Icon and Title */}
                                            <div className="flex flex-col items-center flex-1 justify-center">
                                                <span className={`text-4xl mb-2 ${ach.unlocked ? 'animate-bounce-slow' : ''}`}>
                                                    {ach.icon}
                                                </span>
                                                <p className={`text-xs font-semibold text-center ${
                                                    ach.unlocked ? 'text-amber-900' : 'text-slate-700'
                                                }`}>
                                                    {ach.title}
                                                </p>
                                            </div>
                                            
                                            {/* Bottom section - XP and Lock status */}
                                            <div className="flex flex-col items-center gap-1 w-full">
                                                <div className={`flex items-center gap-1 font-bold text-xs px-2 py-1 rounded-full ${
                                                    ach.unlocked ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                    <XPIcon className="w-3 h-3" />
                                                    <span>{ach.xp} XP</span>
                                                </div>
                                                
                                                {!ach.unlocked && (
                                                    <div className="bg-black bg-opacity-30 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm mt-1">
                                                        🔒 Locked
                                                    </div>
                                                )}
                                            </div>
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