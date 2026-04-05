# 🍦 IceCream Calorie Tracker - Full Stack Application

A complete full-stack web application for tracking and calculating ice cream calories. Built with React, Express.js, and Node.js.

## 🌟 Features

### ✅ Core Functionality
- **Add Ice Cream Entries**: Input name, type (Cone/Cup/Sundae), and scoops
- **Smart Calorie Calculation**: Automatic calculation based on type and scoops
- **Track Entries**: View all ice cream entries in an organized list
- **Delete Entries**: Remove entries and update totals dynamically
- **Total Calories**: Real-time total calorie tracking
- **Daily Limit**: Visual progress bar showing consumption vs daily limit

### 🎨 Advanced Features
- **Dark Mode Toggle**: Switch between light and dark themes
- **Toast Notifications**: Instant feedback on actions
- **Animated Transitions**: Smooth UI animations and hover effects
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Type Breakdown**: Stats showing Cone/Cup/Sundae distribution
- **Average Tracking**: See average calories per entry
- **Sorted List**: Entries sorted by calories (highest first)
- **Health Status**: Visual indicator of daily calorie consumption

## 📐 Calorie Formula

### Cone 🍦
```
(scoops × 120) + 50 = total calories
```

### Cup 🥣
```
(scoops × 100) = total calories
```

### Sundae 🍨
```
(scoops × 110) + 80 = total calories
```

## 🏗️ Project Structure

```
d:\java_project\
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── components/
│   │       ├── IceCreamForm.jsx     # Add entry form
│   │       ├── IceCreamList.jsx     # List of entries
│   │       ├── IceCreamCard.jsx     # Individual entry card
│   │       └── Summary.jsx          # Statistics summary
│   ├── index.html
│   ├── vite.config.js
│   ├── uno.config.js
│   └── package.json
│
└── backend/
    ├── server.js                   # Express server
    ├── routes/
    │   └── icecream.js             # API routes
    ├── controllers/
    │   └── icecreamController.js    # Business logic
    ├── models/
    │   └── IceCream.js             # Data model & storage
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ 
- npm or yarn

### Installation

#### 1. Clone/Download the Project
```bash
cd d:\java_project
```

#### 2. Setup Backend

```bash
cd backend
npm install
npm start
```

Server will run on `http://localhost:5000`

#### 3. Setup Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

App will run on `http://localhost:3000`

### Access the Application
Open your browser and navigate to: **http://localhost:3000**

## 📋 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Add Ice Cream
```
POST /icecream
Content-Type: application/json

{
  "name": "Chocolate",
  "type": "cone",
  "scoops": 2
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Chocolate",
    "type": "cone",
    "scoops": 2,
    "calories": 290
  }
}
```

#### Get All Entries
```
GET /icecream

Response:
{
  "success": true,
  "data": [...],
  "count": 5
}
```

#### Delete Entry
```
DELETE /icecream/:id

Response:
{
  "success": true,
  "message": "Ice cream entry deleted successfully",
  "data": {...}
}
```

#### Get Total Calories
```
GET /icecream-total

Response:
{
  "success": true,
  "totalCalories": 1250
}
```

#### Get Statistics
```
GET /stats

Response:
{
  "success": true,
  "stats": {
    "totalEntries": 5,
    "totalCalories": 1250,
    "avgCaloriesPerEntry": 250,
    "typeBreakdown": {
      "cone": 2,
      "cup": 2,
      "sundae": 1
    }
  }
}
```

#### Calculate Calories
```
POST /calculate-calories
Content-Type: application/json

{
  "type": "sundae",
  "scoops": 3
}

Response:
{
  "success": true,
  "type": "sundae",
  "scoops": 3,
  "calories": 410
}
```

## 🎯 Usage Guide

### Adding an Ice Cream Entry
1. Fill in the ice cream name
2. Select the type (Cone, Cup, or Sundae)
3. Adjust the number of scoops
4. Watch the calorie estimation update in real-time
5. Click "Add Ice Cream" button
6. Entry appears in the list sorted by calories

### Managing Entries
- **View**: All entries displayed as cards with key information
- **Delete**: Click the trash icon to remove an entry
- **Sort**: Entries automatically sorted by calories (highest first)
- **Track**: Total calories and statistics update automatically

### Dark Mode
- Click the moon/sun icon in the top-left corner to toggle dark mode
- Preference persists during the session

## 🧵 Threading Implementation

The application simulates Java-style threading using asynchronous operations:

- **Async Logging**: `setTimeout()` used to log actions asynchronously
- **Example Output**:
  ```
  [THREAD] New Ice Cream Added: Chocolate (2 scoops, 290 kcal)
  [THREAD] Ice Cream Deleted: ID 1
  ```

## 🔒 Validation

### Frontend Validation
- ✅ Prevents empty ice cream names
- ✅ Prevents negative or zero scoops
- ✅ Name limited to 50 characters
- ✅ Scoops capped at 10

### Backend Validation
- ✅ Validates all required fields
- ✅ Checks for valid ice cream types
- ✅ Ensures positive integer scoops
- ✅ Returns descriptive error messages

## 🎨 Tech Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool & dev server
- **UnoCSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Poppins Font**: Modern typography

### Backend
- **Node.js**: Runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **In-Memory Storage**: Array-based data persistence

## 📦 Data Model

```javascript
{
  id: Number,              // Unique identifier
  name: String,            // Ice cream name
  type: 'cone' | 'cup' | 'sundae',  // Type
  scoops: Number,          // Number of scoops (1-10)
  calories: Number,        // Calculated calories
  createdAt: String        // ISO timestamp
}
```

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Modern color gradients
- **Card-Based Layout**: Clean component separation
- **Hover Effects**: Interactive feedback
- **Loading States**: Visual feedback during operations
- **Responsive Grid**: Adapts to all screen sizes
- **Color Coding**: Type and calorie-based coloring
- **Progress Bars**: Visual calorie tracking
- **Toast Notifications**: Action feedback

## 🔄 Data Flow

```
User Input → Frontend Form
    ↓
Form Validation
    ↓
POST /api/icecream
    ↓
Backend Validation
    ↓
Calculate Calories
    ↓
Store in Memory
    ↓
Return Response
    ↓
Update UI
    ↓
Show Toast Notification
```

## 🚀 Deployment (Optional)

### Frontend Deployment (Vercel)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Backend Deployment (Render)
```bash
# Push to GitHub repository
# Connect to Render and deploy from repository
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (5000): Kill process or use different port
# Frontend (3000): Kill process or use different port
```

### CORS Errors
- Ensure backend is running on port 5000
- Verify proxy configuration in vite.config.js
- Check CORS middleware in server.js

### API Not Responding
- Check if backend server is running
- Verify API URL in frontend (.env or axiosCreate)
- Check browser console for errors

## 📝 Example Data

```javascript
// Sample entries
[
  { id: 1, name: "Vanilla", type: "cone", scoops: 1, calories: 170 },
  { id: 2, name: "Chocolate", type: "cup", scoops: 2, calories: 200 },
  { id: 3, name: "Strawberry", type: "sundae", scoops: 3, calories: 410 },
]

// Total: 780 kcal
// Average: 260 kcal/entry
```

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack development (Frontend + Backend)
- ✅ React component architecture
- ✅ RESTful API design
- ✅ State management (useState, useEffect)
- ✅ Async/await operations
- ✅ Form validation and error handling
- ✅ Modern CSS with UnoCSS
- ✅ Component communication
- ✅ Data persistence (in-memory)
- ✅ Real-time updates

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

---

**Built with ❤️ using React, Express.js, and Node.js**

Happy tracking! 🍦
