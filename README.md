# CryoSense Audio Recording App

## How to use

1. Double-click `CryoSenseLauncher.exe` (or run `node start.js` for development).
2. The launcher will install dependencies if needed, start the backend and frontend, and open the app in your browser.
3. Use the web interface to record audio. Recordings are uploaded to the backend and saved in the `backend/uploads` folder.

## Environment Variables
- Backend: `backend/.env` (already set up for local use)
- Frontend: `frontend/.env` (already set up for local use)

## Requirements
- Node.js 18+ (for development or building the launcher)
- Windows OS for `.exe` launcher

## Build the Windows Executable (optional)
1. Install `pkg` globally: `npm install -g pkg`
2. Run: `pkg start.js --targets node18-win-x64 --output CryoSenseLauncher.exe`

## Project Structure
- `backend/` - Express server for audio upload
- `frontend/` - React app for recording and uploading audio
- `start.js` / `CryoSenseLauncher.exe` - Unified launcher

---
For any issues, check the terminal output for errors.