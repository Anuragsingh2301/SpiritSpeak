# Fixing Gemini API Quota Exceeded Error

## The Problem
You're seeing this error:
```
[GoogleGenerativeAI Error]: You exceeded your current quota
```

This happens because the **free tier of Google's Gemini API has usage limits**:
- **15 requests per minute (RPM)**
- **1 million tokens per minute**
- **1,500 requests per day**

## Solutions

### Option 1: Wait for Quota Reset ⏰
- Quotas typically reset **every minute** for RPM limits
- Daily quotas reset at **midnight Pacific Time**
- Just wait a few minutes and try again

### Option 2: Get a New API Key 🔑
If you've exhausted your API key:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy the key
4. Update your `.env` file in the `backend` folder:
   ```
   GEMINI_API_KEY=your_new_api_key_here
   ```
5. Restart your backend server

### Option 3: Use a Different Model ⚡
I've already updated the code to use `gemini-1.5-flash` instead of `gemini-2.5-flash`, which has better rate limits for the free tier.

### Option 4: Upgrade to Paid Plan 💳
For production use, consider upgrading:
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Enable billing
- Much higher rate limits (360 RPM, 4M tokens/min)

## What I've Fixed

✅ Changed model from `gemini-2.5-flash` to `gemini-1.5-flash` (better free tier limits)
✅ Added better error handling with user-friendly messages
✅ Added fallback quotes for "Thought of the Day" if API fails
✅ Clear instructions on how to get a new API key

## Current Configuration

Your backend is now using:
- **Model**: `gemini-1.5-flash`
- **Max tokens**: 500 per request
- **Temperature**: 0.9 (for creative responses)

## Monitoring Your Usage

Check your current usage:
- [Google AI Studio Usage Dashboard](https://ai.dev/usage?tab=rate-limit)

## Tips to Reduce API Calls

1. **Daily reflections are limited** to 3 per day per user (already implemented)
2. **Lore stories are cached** for 24 hours (already implemented)
3. **Thought of the day** has fallback quotes if API fails (just added)

---

**Need help?** Visit the [Gemini API documentation](https://ai.google.dev/gemini-api/docs/rate-limits)
