import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [audioURL, setAudioURL] = useState(null);
  return (
    <AudioContext.Provider value={{ audioURL, setAudioURL }}>
      {children}
    </AudioContext.Provider>
  );
}
