import React from 'react';
import Modal from '../../../components/ui/Modal';
import { moods } from '../../../data'; // To get mood icons

// Helper to format the date nicely
const formatFullDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const EntryDetailModal = ({ isOpen, onClose, entry }) => {
  if (!entry) return null; // Don't render if no entry is selected

  // Find the mood object (icon, color) from our static data
  const moodObj = moods.find(m => m.name === entry.mood);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">

        {/* --- HEADER: Date and Mood --- */}
        <div className="flex items-center justify-between pb-3 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {formatFullDate(entry.createdAt)}
          </h2>
          {moodObj && (
            <div className="flex items-center gap-2">
              <span className="text-xl">{moodObj.icon}</span>
              <span className={`font-semibold ${moodObj.color.split(' ')[1]}`}>
                {entry.mood}
              </span>
            </div>
          )}
        </div>

        {/* --- JOURNAL ENTRY CONTENT --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Entry</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{entry.content}</p>
        </div>

        {/* --- REFLECTIONS SECTION --- */}
        {entry.reflections && entry.reflections.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Reflections ({entry.reflections.length})
            </h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {entry.reflections.map((reflection) => (
                <div key={reflection._id} className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-bold text-sm text-teal-700">
                    {reflection.guideName} said:
                  </span>
                  <p className="mt-1 text-gray-800 whitespace-pre-wrap">
                    {reflection.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};

export default EntryDetailModal;