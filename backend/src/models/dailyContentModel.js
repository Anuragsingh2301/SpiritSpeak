import mongoose from 'mongoose';

const dailyContentSchema = new mongoose.Schema(
  {
    guideId: {
      type: String,
      required: true,
    },
    // We'll store the date with the time zeroed out
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create an index for fast lookups
dailyContentSchema.index({ guideId: 1, date: 1 }, { unique: true });

const DailyContent = mongoose.model('DailyContent', dailyContentSchema);

export default DailyContent;