import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:1234/api/website/list', {
      headers: { Authorization: token }
    }).then(res => setWebsites(res.data));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h2>📂 Your Saved Websites</h2>
      {websites.length === 0 && <p>No websites yet.</p>}
      {websites.map((w, i) => (
        <div key={i} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px' }}>
          <h3>{w.name}</h3>
          <iframe
            title={w.name}
            srcDoc={`<style>${w.css}</style>${w.html}`}
            style={{ width: '100%', height: '200px', border: '1px solid black' }}
          />
        </div>
      ))}
    </div>
  );
}
