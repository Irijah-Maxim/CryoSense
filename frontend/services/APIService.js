import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function uploadAudio(blob) {
  const response = await axios.post(`${API_BASE}/audio`, blob, {
    headers: { 'Content-Type': 'audio/webm' },
  });
  return response.data;
}

export async function fetchAudioList() {
  const response = await axios.get(`${API_BASE}/audio`);
  return response.data;
}