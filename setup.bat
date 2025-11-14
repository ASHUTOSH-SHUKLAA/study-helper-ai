@echo off
REM Study Helper AI - Setup Script for Windows
REM This script helps set up the project quickly

echo.
echo ========================================
echo   Study Helper AI - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Setup Backend
echo [SETUP] Setting up backend...
cd backend

if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo [WARNING] Please edit backend\.env and add your API keys
) else (
    echo [OK] .env file already exists
)

echo Installing backend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

echo [OK] Backend dependencies installed
cd ..

REM Setup Frontend
echo.
echo [SETUP] Setting up frontend...
cd frontend

if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo [OK] Frontend .env created
) else (
    echo [OK] .env file already exists
)

echo Installing frontend dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo [OK] Frontend dependencies installed
cd ..

REM Final instructions
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Add your API key to backend\.env
echo    - Get OpenAI key: https://platform.openai.com
echo    - Or Gemini key: https://makersuite.google.com
echo.
echo 2. Start the backend:
echo    cd backend
echo    npm start
echo.
echo 3. Start the frontend (in a new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo For more help, see QUICKSTART.md
echo.
pause