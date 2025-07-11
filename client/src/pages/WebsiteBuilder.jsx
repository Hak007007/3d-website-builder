import { useState } from 'react';
import axios from 'axios';
import Canvas3D from '../components/Canvas3D';

export default function WebsiteBuilder() {
  const [name, setName] = useState('');
  const [html, setHtml] = useState('<h1>Hello 3D!</h1>');
  const [css, setCss] = useState('h1 { color: red; }');
  const [modelURL, setModelURL] = useState('/sample.glb');

  const saveWebsite = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:1234/api/website/create',
        { name, html, css },
        { headers: { Authorization: token } }
      );
      alert('Website saved!');
    } catch {
      alert('Save failed');
    }
  };

  const generateCSS = () => {
    const styles = `
      body {
        background: linear-gradient(to right, #020024, #090979, #00d4ff);
        font-family: 'Poppins', sans-serif;
      }
      h1 {
        color: white;
        text-shadow: 2px 2px 4px #000000;
      }
    `;
    setCss(styles);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setModelURL(url);
  };

 return (
  <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
    <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>🌐 3D Website Builder</h2>

    <input
      placeholder="Website Name"
      value={name}
      onChange={e => setName(e.target.value)}
      style={{ width: '100%', padding: '10px', marginBottom: '15px', fontSize: '16px' }}
    />

    <textarea
      placeholder="HTML"
      rows={4}
      value={html}
      onChange={e => setHtml(e.target.value)}
      style={{ width: '100%', padding: '10px', marginBottom: '15px', fontSize: '14px' }}
    />

    <textarea
      placeholder="CSS"
      rows={4}
      value={css}
      onChange={e => setCss(e.target.value)}
      style={{ width: '100%', padding: '10px', marginBottom: '15px', fontSize: '14px' }}
    />

    <div style={{ marginBottom: '20px' }}>
      <button onClick={saveWebsite} style={{ marginRight: '10px', padding: '8px 16px', fontSize: '14px' }}>
        💾 Save
      </button>
      <button onClick={generateCSS} style={{ padding: '8px 16px', fontSize: '14px' }}>
        🎨 Generate CSS
      </button>
    </div>

    <h3 style={{ marginTop: '30px', fontSize: '20px' }}>👀 Live Website Preview</h3>
    <iframe
      title="preview"
      srcDoc={`<style>${css}</style>${html}`}
      style={{ width: '100%', height: '300px', border: '1px solid #ccc', marginBottom: '30px' }}
    />

    <h3 style={{ fontSize: '20px' }}>🧱 Upload Your 3D Model (.glb)</h3>
    <input
      type="file"
      accept=".glb"
      onChange={handleFileUpload}
      style={{ marginBottom: '20px' }}
    />

    <Canvas3D url={modelURL} />
  </div>
 )};

