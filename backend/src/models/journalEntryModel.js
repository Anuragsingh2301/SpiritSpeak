import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema(
  {
    // This links the entry to the user who wrote it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // This is the 'journalText' from the page
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    // This is the 'selectedMood' from the page
    mood: {
      type: String,
      required: [true, 'Please select a mood'],
      enum: ['Happy', 'Calm', 'Okay', 'Anxious', 'Sad'],
    },
    // This will store the array of AI reflections
    reflections: [
      {
        guideId: String,  // e.g., "1" for Elara
        guideName: String, // e.g., "Elara, The Creative Muse"
        text: String,      // The AI-generated text
      }
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

export default JournalEntry;