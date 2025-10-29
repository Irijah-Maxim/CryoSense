require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// Audio upload endpoint
app.post('/api/audio', (req, res) => {
  let data = [];
  req.on('data', chunk => data.push(chunk));
  req.on('end', () => {
    const buffer = Buffer.concat(data);
    const filename = `audio_${Date.now()}.webm`;
    const savePath = path.join(__dirname, '../../uploads', filename);
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, buffer);
    res.json({ success: true, filename });
  });
});

// List uploaded audio files
app.get('/api/audio', (req, res) => {
  const uploadDir = path.join(__dirname, '../../uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  const files = fs.readdirSync(uploadDir)
    .filter(f => f.endsWith('.webm'))
    .map(f => ({
      filename: f,
      url: `/uploads/${f}`
    }));
  res.json(files);
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.get('/', (req, res) => {
  res.send('CryoSense backend running');
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});