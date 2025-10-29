// Utility for future audio blob handling (e.g., upload, download, conversion)
export function downloadAudio(url, filename = 'recording.webm') {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
