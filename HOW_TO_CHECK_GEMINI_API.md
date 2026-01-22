# How to Check Your Gemini API Keys

## Method 1: Google AI Studio (Recommended)

1. **Go to Google AI Studio**
   - Visit: https://aistudio.google.com/app/apikey
   - Sign in with your Google account

2. **View Your API Keys**
   - You'll see all your API keys listed
   - Check the quota and usage for each key
   - Create a new key if needed

3. **Check API Key Status**
   - Click on any key to see its details
   - View usage statistics
   - Check rate limits and quotas

## Method 2: Google Cloud Console

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select your project

2. **Enable Gemini API**
   - Go to "APIs & Services" > "Library"
   - Search for "Generative Language API"
   - Click "Enable" if not already enabled

3. **Check Credentials**
   - Go to "APIs & Services" > "Credentials"
   - View your API keys
   - Check restrictions and quotas

## Method 3: Test Your Current Key

I've created a test script for you. Run this command:

```bash
node test_gemini_direct.cjs
```

This will test your current API key and show:
- ✅ Which models work
- ❌ Which models don't work
- 📊 Your quota status
- 🔑 Key validity

## Quick Links:

- **AI Studio (easiest)**: https://aistudio.google.com/app/apikey
- **Google Cloud Console**: https://console.cloud.google.com/
- **Gemini API Docs**: https://ai.google.dev/docs

## What to Look For:

1. **API Key Format**: Should start with `AIza...`
2. **Quota**: Check if you have free tier or paid quota
3. **Enabled APIs**: Make sure "Generative Language API" is enabled
4. **Rate Limits**: Free tier has 15 requests per minute

## If You Have Multiple Accounts:

1. Sign out of Google AI Studio
2. Sign in with each account separately
3. Get the API key from each account
4. Test each key to see which has the best quota

---

**Current Key in Your .env.local:**
```
AIzaSyD62wzoZjmRjNNt9w1D1_O5IUgWDUI0CEY
```

This key is currently returning 404 errors, which means either:
- The models aren't available in that project
- The API isn't enabled
- The key is from an old project

Try getting a fresh key from https://aistudio.google.com/app/apikey
