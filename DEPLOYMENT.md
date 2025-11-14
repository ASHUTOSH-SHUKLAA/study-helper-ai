# Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Make sure `.env` is in `.gitignore`
3. Ensure `backend/package.json` has correct start script

### Step 2: Deploy on Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `study-helper-api` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   AI_PROVIDER=openai
   OPENAI_API_KEY=your_key_here
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://study-helper-api.onrender.com`)

### Important Notes:
- Free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading for production use

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Frontend
```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `study-helper-ai` (or your choice)
- Directory? `./`
- Override settings? **N**

### Step 3: Add Environment Variable
```bash
vercel env add VITE_API_URL
```
Enter your Render backend URL when prompted.

### Step 4: Deploy to Production
```bash
vercel --prod
```

### Alternative: Vercel Dashboard
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: Your Render backend URL
5. Deploy

## Alternative Hosting Options

### Backend Alternatives
- **Railway**: Similar to Render, easy setup
- **Heroku**: Classic option (paid plans only now)
- **Fly.io**: Good free tier
- **Cyclic**: Serverless Node.js hosting

### Frontend Alternatives
- **Netlify**: Similar to Vercel
- **GitHub Pages**: Static hosting
- **Cloudflare Pages**: Fast CDN

## Post-Deployment Checklist

- [ ] Backend health check works: `https://your-backend-url/health`
- [ ] Frontend loads correctly
- [ ] API calls work from frontend to backend
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Dark mode persists
- [ ] Topic history saves to localStorage
- [ ] Error messages display properly
- [ ] Both regular and math modes work

## Troubleshooting

### CORS Errors
Add your frontend URL to `ALLOWED_ORIGINS` in backend environment variables:
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

### Backend Not Responding
- Check Render logs for errors
- Verify environment variables are set
- Ensure API key is valid
- Check if service is sleeping (free tier)

### Frontend Can't Connect
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors
- Ensure backend URL includes `https://`
- Test backend health endpoint directly

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs for specific errors
- Ensure `.env.example` exists but `.env` is gitignored

## Monitoring

### Backend Monitoring
- Render provides logs and metrics
- Set up uptime monitoring (e.g., UptimeRobot)
- Monitor API response times

### Frontend Monitoring
- Vercel provides analytics
- Check browser console for errors
- Monitor Core Web Vitals

## Updating Your Deployment

### Backend Updates
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render will auto-deploy on push.

### Frontend Updates
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push origin main
vercel --prod
```

## Cost Considerations

### Free Tier Limits
- **Render**: 750 hours/month, sleeps after 15 min inactivity
- **Vercel**: 100 GB bandwidth, unlimited deployments
- **OpenAI**: $5 free credit (expires after 3 months)
- **Gemini**: 60 requests/minute free

### Staying Within Free Tier
- Use mock data fallback when API limits reached
- Implement request caching
- Monitor usage regularly
- Consider rate limiting