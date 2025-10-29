#!/usr/bin/env node
// CryoSense/start.js
// Unified launcher for both backend and frontend (development mode)

const { exec } = require('child_process');
const path = require('path');
const open = require('open');

// Paths to backend and frontend
const backendPath = path.join(__dirname, 'backend', 'src', 'server.js');
const frontendPath = path.join(__dirname, 'frontend');

// Ensure backend and frontend dependencies are installed
const installBackend = exec('npm install', { cwd: path.join(__dirname, 'backend') }, (err, stdout, stderr) => {
  if (err) console.error('Backend npm install error:', err);
  if (stdout) console.log('Backend npm install:', stdout);
  if (stderr) console.error('Backend npm install:', stderr);
});
installBackend.stdout && installBackend.stdout.on('data', data => console.log('Backend npm install:', data));
installBackend.stderr && installBackend.stderr.on('data', data => console.error('Backend npm install:', data));

const installFrontend = exec('npm install', { cwd: frontendPath }, (err, stdout, stderr) => {
  if (err) console.error('Frontend npm install error:', err);
  if (stdout) console.log('Frontend npm install:', stdout);
  if (stderr) console.error('Frontend npm install:', stderr);
});
installFrontend.stdout && installFrontend.stdout.on('data', data => console.log('Frontend npm install:', data));
installFrontend.stderr && installFrontend.stderr.on('data', data => console.error('Frontend npm install:', data));

// Start backend
const backend = exec(`node "${backendPath}"`, (err, stdout, stderr) => {
  if (err) console.error('Backend error:', err);
  if (stdout) console.log('Backend:', stdout);
  if (stderr) console.error('Backend:', stderr);
});
backend.stdout && backend.stdout.on('data', data => console.log('Backend:', data));
backend.stderr && backend.stderr.on('data', data => console.error('Backend:', data));

// Start frontend (assumes npm start or similar is set up)
const frontend = exec('npm start', { cwd: frontendPath }, (err, stdout, stderr) => {
  if (err) console.error('Frontend error:', err);
  if (stdout) console.log('Frontend:', stdout);
  if (stderr) console.error('Frontend:', stderr);
});
frontend.stdout && frontend.stdout.on('data', data => {
  console.log('Frontend:', data);
  // Try to open browser when dev server is ready
  if (data.includes('http://localhost:')) {
    const url = data.match(/http:\/\/localhost:\d+/);
    if (url) open(url[0]);
  }
});
frontend.stderr && frontend.stderr.on('data', data => console.error('Frontend:', data));

console.log('CryoSense unified launcher started.');
console.log('Backend and frontend will run in parallel.');
