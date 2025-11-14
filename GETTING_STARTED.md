# Getting Started with Study Helper AI

Welcome! This guide will help you get Study Helper AI up and running quickly.

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download here](https://nodejs.org))
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)
- **API Key** from either:
  - [OpenAI](https://platform.openai.com) (Recommended)
  - [Google Gemini](https://makersuite.google.com) (Alternative)

## 🚀 Quick Setup (5 minutes)

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
cd study-helper-ai
setup.bat
```

**Mac/Linux:**
```bash
cd study-helper-ai
chmod +x setup.sh
./setup.sh
```

The script will:
- Install all dependencies
- Create .env files
- Guide you through configuration

### Option 2: Manual Setup

**Step 1: Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here
```

**Step 2: Frontend Setup**
```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

## 🎯 Running the Application

### Start Backend (Terminal 1)
```bash
cd backend
npm start
```

You should see:
```
🚀 Server running on port 5000
📚 Study Helper API ready
🤖 AI Provider: openai
```

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v4.5.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
```

### Open in Browser
Navigate to: **http://localhost:3000**

## 🧪 Test It Out

1. **Enter a topic**: Try "photosynthesis"
2. **Click Generate**: Wait 5-10 seconds
3. **View Results**: See summary, quiz, and study tip
4. **Try Math Mode**: Check the box and search "algebra"
5. **Toggle Dark Mode**: Click the moon/sun icon
6. **Check History**: Your searches are saved

## 🔑 Getting API Keys

### OpenAI (Recommended)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)
6. Paste into `backend/.env`

**Note**: New accounts get $5 free credit

### Google Gemini (Alternative)

1. Go to [makersuite.google.com](https://makersuite.google.com)
2. Sign in with Google account
3. Click **Get API Key**
4. Copy the key
5. Update `backend/.env`:
   ```env
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your-key-here
   ```

## 📚 Documentation Guide

- **README.md** - Main project documentation
- **QUICKSTART.md** - Fast setup guide
- **DEPLOYMENT.md** - How to deploy to production
- **TESTING.md** - Testing procedures
- **PROJECT_SUMMARY.md** - Technical overview

## 🐛 Troubleshooting

### Backend won't start

**Problem**: Port 5000 already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**: Change port in `backend/.env`:
```env
PORT=5001
```

And update `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001
```

---

**Problem**: API key error
```
Error: Invalid API key
```

**Solution**: 
- Check key is correct (no extra spaces)
- Verify key has credits/quota
- Try regenerating the key

---

### Frontend won't connect

**Problem**: Cannot connect to backend
```
Error: Cannot connect to server
```

**Solution**:
1. Verify backend is running
2. Check `VITE_API_URL` in `frontend/.env`
3. Try accessing `http://localhost:5000/health` directly

---

### Dependencies won't install

**Problem**: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### No AI responses

**Problem**: App works but generates mock data

**Solution**: This is normal! The app has a fallback system:
1. Check if API key is set correctly
2. Verify API has available credits
3. Check backend logs for errors
4. Mock data ensures app always works

## 🎓 Usage Tips

### Getting Better Results

**Be Specific**
- ❌ "science"
- ✅ "photosynthesis in plants"

**Use Proper Topics**
- ❌ "asdfgh"
- ✅ "quantum mechanics"

**Try Math Mode**
- Great for: algebra, calculus, physics
- Gets quantitative problems with solutions

### Features to Explore

1. **Dark Mode**: Saves your preference
2. **History**: Click past topics to reload
3. **Quiz**: Interactive with instant feedback
4. **Study Tips**: Personalized learning advice

## 🚢 Next Steps

### Local Development
- Modify components in `frontend/src/components/`
- Update API logic in `backend/src/services/`
- Test changes with `npm test` in backend

### Deploy to Production
See **DEPLOYMENT.md** for:
- Deploying backend to Render
- Deploying frontend to Vercel
- Setting up environment variables
- Monitoring and maintenance

### Customize
- Change colors in `tailwind.config.js`
- Modify AI prompts in `aiService.js`
- Add new features to components

## 📞 Getting Help

### Check Documentation
1. Read error messages carefully
2. Check relevant .md files
3. Review code comments

### Common Resources
- [Node.js Docs](https://nodejs.org/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com)

### Debug Mode
Enable detailed logging:

Backend - add to `.env`:
```env
NODE_ENV=development
```

Frontend - check browser console (F12)

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can search a topic successfully
- [ ] Summary displays (3 points)
- [ ] Quiz shows (3 questions)
- [ ] Study tip appears
- [ ] Dark mode toggles
- [ ] History saves topics
- [ ] Math mode works
- [ ] No console errors

## 🎉 Success!

If you can:
1. Search for a topic
2. See AI-generated content
3. Take the quiz
4. Toggle dark mode

**You're all set!** Start learning smarter with Study Helper AI.

## 📖 Learn More

- Explore the codebase
- Read through components
- Try modifying prompts
- Add new features
- Deploy to production

Happy studying! 🚀