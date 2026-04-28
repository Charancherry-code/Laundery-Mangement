# Deployment Guide - Laundry Management System

## Overview
- **Frontend**: Vercel (Free)
- **Backend**: Railway (Free tier available)
- **Database**: MongoDB Atlas (Already set up)

---

## Step 1: Prepare for Deployment

### Backend Changes

1. **Update CORS to allow Vercel frontend:**

Edit `backend/server.js`:

```javascript
// Replace this:
app.use(cors());

// With this:
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

2. **Add health check endpoint** (for Railway):

Add to `backend/routes/orderRoutes.js`:

```javascript
// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

3. **Create `railway.toml` in backend folder:**

```toml
[build]
builder = "nodejs"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/orders/health"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
```

4. **Update `.env.example` for production:**

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
FRONTEND_URL=https://your-vercel-app.vercel.app
```

---

## Step 2: Deploy Backend to Railway

### 2.1 Sign up & Install
1. Go to https://railway.app
2. Sign up with GitHub
3. Install Railway CLI (optional):
   ```bash
   npm install -g @railway/cli
   ```

### 2.2 Deploy via Railway Dashboard

1. **Push your code to GitHub:**
   ```bash
   # Create .gitignore first
   echo "node_modules/
   .env
   .env.local
   *.log" > .gitignore
   
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/laundry-management.git
   git push -u origin main
   ```

2. **In Railway Dashboard:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Click "Deploy"

3. **Add Environment Variables:**
   - Go to your project → Variables
   - Add these:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/laundry-management?retryWrites=true&w=majority
     FRONTEND_URL=https://your-vercel-app.vercel.app (we'll update this after Vercel deploy)
     ```

4. **Get your Railway URL:**
   - After deployment, Railway gives you a URL like:
     `https://laundry-management-production.up.railway.app`
   - Copy this URL

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Update API URL

Edit `frontend/src/services/api.js`:

```javascript
// Change this:
const API_BASE_URL = 'http://localhost:5000/api/orders';

// To this:
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/orders';
```

### 3.2 Create vercel.json in frontend folder

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 3.3 Update package.json scripts

Ensure your `frontend/package.json` has:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

### 3.4 Deploy to Vercel

**Option A: Via Vercel Dashboard (Easier)**

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. **Configure:**
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   
6. **Add Environment Variable:**
   - `REACT_APP_API_URL=https://your-railway-url/api/orders`
   
7. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Go to frontend folder
cd frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? [Y/n] → Y
# - Link to existing project? [y/N] → N (first time)
# - What's your project name? → laundry-management-frontend
# - In which directory is your code located? → ./
# - Want to override settings? [y/N] → N
```

---

## Step 4: Update CORS & Environment Variables

### 4.1 Update Railway CORS

1. Go to Railway dashboard
2. Find your backend service
3. Go to Variables
4. Update `FRONTEND_URL` with your actual Vercel URL:
   ```
   FRONTEND_URL=https://laundry-management-frontend.vercel.app
   ```
5. Redeploy (happens automatically)

### 4.2 Test the Connection

1. Visit your Vercel URL
2. Check if dashboard loads
3. Try creating an order
4. Check browser console for any CORS errors

---

## Step 5: Alternative - Deploy Everything to Railway (Simpler)

If separate deployments are complex, deploy everything to Railway:

### 5.1 Update Project Structure

Create a root `package.json`:

```json
{
  "name": "laundry-management",
  "version": "1.0.0",
  "scripts": {
    "start": "cd backend && npm start",
    "build": "cd frontend && npm install && npm run build",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### 5.2 Update server.js to serve frontend

```javascript
const express = require('express');
const path = require('path');

// ... existing code ...

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}
```

### 5.3 Deploy to Railway

1. Push all code to GitHub
2. Railway will auto-detect and deploy both frontend and backend
3. Single URL serves everything

---

## Quick Reference

### Railway Commands
```bash
# Login
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open
```

### Vercel Commands
```bash
# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

---

## Troubleshooting

### CORS Errors
- Check `FRONTEND_URL` in Railway matches exactly (including https://)
- Ensure no trailing slash
- Check browser console for exact error

### 404 Errors
- Ensure API calls use correct Railway URL
- Check `/api/orders` prefix in all requests

### Database Connection
- Verify MongoDB IP whitelist (allow all: `0.0.0.0/0`)
- Check connection string format
- Ensure database user has correct permissions

---

## Your URLs After Deployment
- **Frontend**: https://laundry-management-frontend.vercel.app
- **Backend**: https://laundry-management.up.railway.app
- **API**: https://laundry-management.up.railway.app/api/orders

---

## Free Tier Limits
- **Railway**: $5/month free credit (~500 hours runtime)
- **Vercel**: Hobby plan (unlimited static sites)
- **MongoDB Atlas**: 512MB storage (free forever)

For production, consider upgrading for better performance and uptime.
