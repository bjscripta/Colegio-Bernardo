import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/keycloakadapter/login', {
        username: username,
        password: password
      });

      const token = response.data.access_token || response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        onLoginSuccess();
      } else {
        setError('No se recibió autorización del servidor.');
      }
    } catch (err) {
      setError('Credenciales incorrectas. Solo profesores autorizados.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f9' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' }}>
        <h2 style={{ color: '#1e3a8a', textAlign: 'center', marginBottom: '20px' }}>🏫 EduManager</h2>
        <h3 style={{ textAlign: 'center', color: '#4b5563', marginBottom: '20px' }}>Acceso Docente</h3>
        
        {error && <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#374151', marginBottom: '5px' }}>Usuario</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', color: '#374151', marginBottom: '5px' }}>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
            required
          />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
          Ingresar al Sistema
        </button>
      </form>
    </div>
  );
};

export default Login;