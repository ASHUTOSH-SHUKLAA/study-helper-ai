# Quick Start Guide

Get Study Helper AI running locally in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- npm or yarn
- OpenAI API key OR Google Gemini API key

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd study-helper-ai
```

## Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your API key
# For Windows: notepad .env
# For Mac/Linux: nano .env
```

Add to `.env`:
```env
PORT=5000
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
```

```bash
# Start the backend server
npm start
```

Backend should now be running on `http://localhost:5000`

## Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env
# For Windows: notepad .env
# For Mac/Linux: nano .env
```

Add to `.env`:
```env
VITE_API_URL=http://localhost:5000
```

```bash
# Start the frontend
npm run dev
```

Frontend should now be running on `http://localhost:3000`

## Step 4: Test It Out!

1. Open your browser to `http://localhost:3000`
2. Enter a topic like "photosynthesis"
3. Click "Generate Study Materials"
4. View your AI-generated summary, quiz, and study tip!

## Getting API Keys

### OpenAI (Recommended)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Go to API Keys section
4. Create new secret key
5. Copy and paste into `.env`

### Google Gemini (Alternative)
1. Go to [makersuite.google.com](https://makersuite.google.com)
2. Sign up / Log in
3. Get API key
4. Update `.env`:
   ```env
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your-key-here
   ```

## Testing

### Test Backend
```bash
cd backend
npm test
```

### Manual Test
1. Open browser to `http://localhost:5000/health`
2. Should see: `{"status":"ok",...}`

## Troubleshooting

### Port Already in Use
```bash
# Backend (change PORT in .env)
PORT=5001

# Frontend (change in vite.config.js)
server: { port: 3001 }
```

### Cannot Connect to Backend
- Make sure backend is running
- Check `VITE_API_URL` in frontend/.env
- Verify no firewall blocking

### API Key Errors
- Verify key is correct (no extra spaces)
- Check API key has credits/quota
- Try the mock fallback (works without API key)

## Next Steps

- Try Math Mode for quantitative questions
- Toggle dark mode
- Check out your topic history
- Deploy to production (see DEPLOYMENT.md)

## Need Help?

- Check the main README.md
- Review DEPLOYMENT.md for hosting
- Open an issue on GitHub
- Check backend logs for errors