# 🚀 Quick Start Guide

## For Windows Users

### Step 1: Open PowerShell/Command Prompt
Navigate to the project directory:
```cmd
cd d:\java_project
```

### Step 2: Run Setup (Optional)
```cmd
.\setup.bat
```

### Step 3: Start Backend
Open a new terminal and run:
```cmd
cd backend
npm install
npm start
```

You should see:
```
🍦 IceCream Tracker Backend running on http://localhost:5000
```

### Step 4: Start Frontend
Open another new terminal and run:
```cmd
cd frontend
npm install
npm run dev
```

You should see:
```
VITE xxx [42s] ready in xxx ms
➜  Local:   http://localhost:3000/
```

### Step 5: Access Application
Open your browser and go to: **http://localhost:3000**

---

## For macOS/Linux Users

### Step 1: Open Terminal
```bash
cd d:\java_project
# or navigate to your extracted directory
```

### Step 2: Run Setup (Optional)
```bash
chmod +x setup.sh
./setup.sh
```

### Step 3: Start Backend
```bash
cd backend
npm install
npm start
```

### Step 4: Start Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### Step 5: Access Application
Open your browser: **http://localhost:3000**

---

## Common Issues & Solutions

### ❌ "Cannot find command: node"
**Solution**: Install Node.js from https://nodejs.org/

### ❌ "Port 5000 already in use"
**Solution**: Close the existing process or change PORT in backend/.env

### ❌ "Port 3000 already in use"
**Solution**: Change port in frontend/vite.config.js

### ❌ "CORS Error"
**Solution**: Ensure backend is running on port 5000, check proxy in vite.config.js

### ❌ "npm: command not found"
**Solution**: Reinstall Node.js or check PATH environment variable

---

## Testing the Application

### Manual Testing Checklist

- [ ] Backend starts without errors (http://localhost:5000/health)
- [ ] Frontend loads successfully (http://localhost:3000)
- [ ] Can add ice cream entry (name, type, scoops)
- [ ] Calories calculate correctly
- [ ] Entry appears in list
- [ ] Total calories update
- [ ] Can delete an entry
- [ ] Total updates after deletion
- [ ] Dark mode toggle works
- [ ] Toast notifications appear
- [ ] Form validation works (empty name, negative scoops)
- [ ] Stats show type breakdown
- [ ] Entries are sorted by calories

### API Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status": "Server is running"}
```

### Add Test Entry

```bash
curl -X POST http://localhost:5000/api/icecream \
  -H "Content-Type: application/json" \
  -d '{"name":"Vanilla","type":"cone","scoops":2}'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Vanilla",
    "type": "cone",
    "scoops": 2,
    "calories": 290
  }
}
```

### Get All Entries

```bash
curl http://localhost:5000/api/icecream
```

### Get Statistics

```bash
curl http://localhost:5000/api/stats
```

---

## Development Tips

1. **Frontend File Structure**:
   - `src/App.jsx` - Main component
   - `src/components/` - Reusable components
   - `src/main.jsx` - Entry point

2. **Backend File Structure**:
   - `server.js` - Express setup
   - `routes/` - API routes
   - `controllers/` - Business logic
   - `models/` - Data & calculations

3. **Hot Reload**: Changes in both frontend and backend auto-reload

4. **Browser DevTools**:
   - Open DevTools (F12)
   - Check Network tab for API calls
   - Check Console for logs

5. **Backend Logs**:
   - Check terminal for "[THREAD]" logs
   - Shows when items are added/deleted

---

## Next Steps

After getting the app running:

1. **MongoDB Integration**: Replace in-memory storage with MongoDB
2. **User Authentication**: Add login/signup
3. **Deployment**: Deploy to Vercel (frontend) and Render (backend)
4. **Mobile App**: Create React Native version
5. **Advanced Stats**: Add charts and analytics

---

## Database Migration Notes

Current setup uses in-memory storage (Array in `backend/models/IceCream.js`).

To upgrade to MongoDB:
1. Install mongoose: `npm install mongoose`
2. Replace IceCream.js model with MongoDB schema
3. Update routes to use await patterns
4. Restart backend

The API interface stays the same, so frontend needs no changes!

---

## Troubleshooting Commands

```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS
lsof -ti:5000 | xargs kill -9

# Linux
fuser -k 5000/tcp
```

---

**Happy Ice Cream Tracking! 🍦**
