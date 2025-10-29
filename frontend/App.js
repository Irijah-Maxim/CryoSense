import React, { useState, useEffect } from 'react';
import RecorderButton from './components/RecorderButton';
import { fetchAudioList } from './services/APIService';

export default function App() {
  const [audioURL, setAudioURL] = useState(null);
  const [audioList, setAudioList] = useState([]);

  useEffect(() => {
    fetchAudioList().then(setAudioList);
  }, []);

  // Refresh list after upload
  const handleRecordingComplete = (url) => {
    setAudioURL(url);
    setTimeout(() => fetchAudioList().then(setAudioList), 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60, fontFamily: 'sans-serif' }}>
      <h1>CryoSense Audio Recorder</h1>
      <RecorderButton onRecordingComplete={handleRecordingComplete} />
      {audioURL && (
        <div style={{ marginTop: 30 }}>
          <h3>Playback (Latest Recording)</h3>
          <audio controls src={audioURL} />
        </div>
      )}
      <div style={{ marginTop: 40, width: 400 }}>
        <h2>Uploaded Recordings</h2>
        {audioList.length === 0 && <div>No recordings yet.</div>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {audioList.map(file => (
            <li key={file.filename} style={{ marginBottom: 16, background: '#f4f6f8', padding: 12, borderRadius: 8 }}>
              <span style={{ marginRight: 10 }}>{file.filename}</span>
              <audio controls src={file.url} style={{ verticalAlign: 'middle' }} />
              <a href={file.url} download style={{ marginLeft: 10 }}>Download</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
