import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [data, setData] = useState({ username: '', email: '', password: '' });

  const register = async () => {
    try {
      await axios.post('http://localhost:1234/api/auth/register', data);
      alert('Registered!');
      window.location.href = '/login';
    } catch {
      alert('Failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', fontFamily: 'Poppins, sans-serif' }}>
      <h2>📝 Register</h2>
      <input
        placeholder="Username"
        onChange={e => setData({ ...data, username: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setData({ ...data, password: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}
