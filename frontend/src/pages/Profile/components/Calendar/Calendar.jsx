import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { useGetCalendarDataQuery, useGetJournalEntriesQuery } from "../../../../apis/journalApiSlice";
import Modal from "../../../../components/ui/Modal";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
};

export const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetch calendar data from backend
  const { data: calendarResponse, isLoading } = useGetCalendarDataQuery();
  const dateColors = calendarResponse?.data || {};

  // Fetch all journal entries
  const { data: journalData, isLoading: isLoadingEntries } = useGetJournalEntriesQuery();
  const allEntries = journalData?.data || [];

  // Filter entries for the selected date
  const entriesForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    
    const dateString = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    return allEntries.filter(entry => {
      const entryDate = new Date(entry.createdAt);
      const entryDateString = `${entryDate.getFullYear()}-${String(
        entryDate.getMonth() + 1
      ).padStart(2, "0")}-${String(entryDate.getDate()).padStart(2, "0")}`;
      return entryDateString === dateString;
    });
  }, [selectedDate, allEntries]);

  // --- LOGIC: The function to apply classes to tiles ---
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      // Return the Tailwind class if the date is in our map
      return dateColors[dateString]?.color;
    }
  };

  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const formatEntryTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatEntryDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-500">Loading calendar...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <Calendar
          onChange={handleDateClick}
          value={date}
          tileClassName={tileClassName}
          next2Label={null}
          prev2Label={null}
        />
      </div>

      {/* Modal to show entries for selected date */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Entries for {selectedDate && formatEntryDate(selectedDate.toISOString())}
          </h2>

          {isLoadingEntries ? (
            <p className="text-gray-500">Loading entries...</p>
          ) : entriesForSelectedDate.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No entries found for this date.</p>
              <p className="text-gray-400 text-sm mt-2">Start journaling to see your thoughts here!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entriesForSelectedDate.map((entry) => (
                <div 
                  key={entry._id} 
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      {formatEntryTime(entry.createdAt)}
                    </span>
                    {entry.mood && (
                      <span className="text-lg">{
                        entry.mood === 'Happy' ? '😊' :
                        entry.mood === 'Calm' ? '😌' :
                        entry.mood === 'Okay' ? '😐' :
                        entry.mood === 'Anxious' ? '😟' :
                        entry.mood === 'Sad' ? '😢' : '😐'
                      }</span>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {truncateText(entry.content, 200)}
                  </p>
                  {entry.reflections && entry.reflections.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-300">
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        Reflection by {entry.reflections[0].guideName}:
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        {truncateText(entry.reflections[0].text, 150)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Calender;
