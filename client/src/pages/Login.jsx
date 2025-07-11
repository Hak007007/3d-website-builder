import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:1234/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      window.location.href = '/builder';
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', fontFamily: 'Poppins, sans-serif' }}>
      <h2>🔐 Login</h2>
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
      <button onClick={login}>Login</button>
    </div>
  );
}
