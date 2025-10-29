import React, { useState, useRef } from 'react';
import { uploadAudio } from '../services/APIService';

export default function RecorderButton({ onRecordingComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    setError(null);
    setUploadStatus('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Microphone access denied or not available.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        onRecordingComplete(url);
        setUploadStatus('Uploading...');
        try {
          await uploadAudio(blob);
          setUploadStatus('Upload successful!');
        } catch (e) {
          setUploadStatus('Upload failed.');
        }
      };
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          background: isRecording ? '#e74c3c' : '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: 50,
          width: 100,
          height: 100,
          fontSize: 18,
          cursor: 'pointer',
          marginTop: 20,
        }}
      >
        {isRecording ? 'Stop' : 'Record'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {uploadStatus && <div style={{ marginTop: 10 }}>{uploadStatus}</div>}
    </div>
  );
}
