@echo off
REM IceCream Calorie Tracker - Setup Script for Windows

echo.
echo 🍦 IceCream Calorie Tracker - Full Stack Setup
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v14+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo ✅ npm version:
npm --version
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend
echo Installing backend dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully
echo.

REM Setup Frontend
echo 📦 Setting up Frontend...
cd ..\frontend
echo Installing frontend dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully
echo.

echo ================================================
echo ✅ Setup completed successfully!
echo.
echo 🚀 To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm start
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo 📱 Access at: http://localhost:3000
echo ================================================
pause
