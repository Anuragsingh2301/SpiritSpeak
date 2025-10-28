import Reflection from './components/Reflection'; 
import MoodChart from './components/MoodChart';
import Sidebar from '../Sidebar/Sidebar'; 
import { useGetThoughtOfTheDayQuery, useGetAllGuidesQuery } from '../../apis/guidesApiSlice.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import GetCurrentUserData from '../../hooks/GetCurrentUserData';
import { useGetJournalEntriesQuery, useGetStreakQuery } from '../../apis/journalApiSlice';
import LoadingScreen from '../../components/LoadingScreen';
import Modal from '../../components/ui/Modal';
import Journal from '../Journal/journal';
import EntryDetailModal from './components/EntryDetailModal';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
};

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} days ago`;
  return `${weeks} weeks ago`;
};

// --- NEW ThoughtWidget COMPONENT ---
const ThoughtWidget = ({ thoughtData, guideInfo, isLoading, isError }) => {

  // 1. Find the corresponding guide detail for color
  const guideDetail = guideInfo.find(info => info.guideName === thoughtData?.guideName);

  // 2. Determine the background class
  const colorClass = guideDetail 
    ? guideDetail.colorPalette.widgetBg 
    : 'bg-green-700 text-white'; // Default to green

  const widgetClasses = `p-6 rounded-xl shadow-lg ${colorClass}`;

  // 3. Handle Loading and Error States
  let content;
  if (isLoading) {
    content = (
      <>
        <h3 className="text-xl font-bold opacity-80 mb-2">A Thought is loading...</h3>
        <p className="text-sm font-light italic">Please wait.</p>
      </>
    );
  } else if (isError) {
    content = (
      <>
        <h3 className="text-xl font-bold opacity-80 mb-2">A Thought from Orion</h3>
        <p className="text-sm font-light italic">"Clarity comes from engagement, not thought."</p>
      </>
    );
  } else if (thoughtData) {
    content = (
      <>
        <h3 className="text-xl font-bold opacity-80 mb-2">A Thought from {thoughtData.guideName.split(',')[0]}</h3>
        <p className="text-sm font-light italic">"{thoughtData.quote}"</p>
      </>
    );
  }

  return (
    <div className={widgetClasses}>
      {content}
    </div>
  );
};

// Past Entries Widget
const PastEntries = ({ entries, isLoading, onEntryClick }) => {

  const formatEntryTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatEntryDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2 text-gray-800">
        Past Entries
      </h3>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading entries...</p>
      ) : !entries || entries.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven't written any entries yet.
        </p>
      ) : (
        entries.slice(0, 3).map(
          (
            entry // Show 3 entries
          ) => (
            <div key={entry._id} className="text-sm cursor-pointer hover:bg-gray-50 p-1 rounded" onClick={() => onEntryClick(entry)}>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <p className="font-medium">
                  {formatEntryDate(entry.createdAt)}
                </p>
                <p>{formatEntryTime(entry.createdAt)}</p>
              </div>
              <p className="text-gray-700 leading-snug">
                {truncateText(entry.content, 70)}
              </p>
            </div>
          )
        )
      )}
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
  const { currentUser } = GetCurrentUserData();

  console.log("Current User in Dashboard:", currentUser);

  const navigate = useNavigate();
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const location = useLocation();

  // Fetch guides from backend
  const { data: guidesResponse, isLoading: isLoadingGuides } = useGetAllGuidesQuery();
  const guideInfo = guidesResponse?.data || [];

  useEffect(() => {
    // Check if we navigated here with instructions to open the journal
    if (location.state?.openJournal) {
      setIsJournalOpen(true);
      // We clear the state so it doesn't re-open on a dashboard refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const {
    data: journalData,
    isLoading: isLoadingEntries,
    isError,
  } = useGetJournalEntriesQuery();

  const allEntries = journalData?.data || [];

  // Calculate Mood History (for the last 7 days)
  const moodHistory = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();

    const last7Days = Array(7)
      .fill(null)
      .map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        return {
          day: days[date.getDay()],
          mood: null,
          date: date.toDateString(), // For matching
        };
      });

    // Find the latest mood for each of the last 7 days
    for (const entry of allEntries) {
      const entryDate = new Date(entry.createdAt).toDateString();
      const dayIndex = last7Days.findIndex((day) => day.date === entryDate);

      if (dayIndex !== -1 && last7Days[dayIndex].mood === null) {
        last7Days[dayIndex].mood = entry.mood;
      }
    }
    return last7Days;
  }, [allEntries]);

  const {
    data: thoughtData,
    isLoading: isLoadingThought,
    isError: isErrorThought,
  } = useGetThoughtOfTheDayQuery();

  const { data: streakData, isLoading: isLoadingStreak } = useGetStreakQuery();
  const currentStreak = streakData?.streak || 0;

  // This logic finds, flattens, sorts, and merges all reflections
  const recentReflections = useMemo(() => {
    if (!allEntries || !guideInfo) return [];

    // 1. Flatten all reflections into one list
    const allReflections = allEntries.flatMap((entry) =>
      entry.reflections.map((reflection) => ({
        ...reflection,
        createdAt: entry.createdAt, // Give it the parent's timestamp
        parentEntry: entry,
      }))
    );

    // 2. Sort the list so newest reflections are first
    allReflections.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // 3. Merge with guideInfo and format for the component
    return allReflections
      .map((reflection) => {
        const guideDetail = guideInfo.find(
          (info) => info.guideName === reflection.guideName
        );
        return {
          id: reflection._id,
          guideName: reflection.guideName,
          text: truncateText(reflection.text, 120), // This is the AI-generated text
          timestamp: formatTimeAgo(reflection.createdAt),
          guideColor: guideDetail
            ? guideDetail.colorPalette.cardBg
            : "bg-gray-100",
          titleColor: guideDetail
            ? guideDetail.colorPalette.titleColor
            : "text-gray-800",
          parentEntry: reflection.parentEntry,
        };
      })
      .slice(0, 2); // Get just the 2 most recent
  }, [allEntries, guideInfo]);

  const handleWriteEntryClick = () => {
    setIsJournalOpen(true);
  };

  if (isLoadingEntries || isLoadingGuides) {
    return (
      <div className="flex min-h-screen bg-[#f0efeb]">
        <Sidebar />
        <main className="flex-1 p-8">
          <LoadingScreen />
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen bg-[#f0efeb]">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-xl text-red-500">
            Failed to load journal entries.
          </h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0efeb]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex">
          {/* 1. LEFT COLUMN */}
          <div className="w-2/3 pr-10 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{`Hello ${currentUser?.name}!`}</h1>
            <p className="text-gray-500 mb-6">Welcome back to your space.</p>

            {/* RECENT REFLECTIONS CONTAINER (White Box) */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Reflections
              </h2>

              <div className="space-y-4">
                {isLoadingEntries ? (
                  <p className="text-sm text-gray-500">
                    Loading reflections...
                  </p>
                ) : recentReflections.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No reflections found yet. Write a journal entry and get one!
                  </p>
                ) : (
                  recentReflections.map((reflection) => (
                    <Reflection
                      key={reflection.id}
                      guide={reflection}
                      onClick={() => setSelectedEntry(reflection.parentEntry)}
                    />
                  ))
                )}
              </div>

              {/* Button to navigate to the journal route */}
              <div className="mt-28 w-full pt-4">
                <button
                  onClick={handleWriteEntryClick}
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
            {!isLoadingStreak && currentStreak > 0 && (
              <div
                key={currentStreak} /* Re-triggers animation on change */
                className="
      w-full p-4 rounded-xl shadow-lg 
      flex items-center justify-between 
      bg-gradient-to-r from-yellow-300 to-orange-400 
      text-yellow-950 animate-popIn
    "
              >
                <div className="flex items-center">
                  <span className="text-4xl animate-pulse">🔥</span>
                  <div className="ml-3">
                    <div className="text-2xl font-bold">{currentStreak}</div>
                    <div className="text-sm font-semibold -mt-1">
                      {currentStreak > 1 ? "Day Streak" : "Day Streak"}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-medium italic">Keep it up!</div>
              </div>
            )}

            {/* RENDER RANDOM THOUGHT WIDGET */}
            <ThoughtWidget
              thoughtData={thoughtData}
              guideInfo={guideInfo}
              isLoading={isLoadingThought}
              isError={isErrorThought}
            />

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Weekly Mood Overview
              </h2>
              <MoodChart moodHistory={moodHistory} />
            </div>
            {/* Past Entries */}
            <PastEntries
              entries={allEntries}
              isLoading={isLoadingEntries}
              onEntryClick={setSelectedEntry}
            />
          </div>
        </div>
      </main>
      <Modal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)}>
        <Journal
          onClose={() => setIsJournalOpen(false)}
          guideIdFromNav={location.state?.guideId}
        />
      </Modal>
      <EntryDetailModal
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry}
      />
    </div>
  );
};

export default Dashboard;