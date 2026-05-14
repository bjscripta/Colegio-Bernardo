import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Estudiantes from './pages/Estudiantes';
import Asistencia from './pages/Asistencia';
import Evaluaciones from './pages/Evaluaciones';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const navLinkStyle = ({ isActive }) => ({
    color: 'white',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : '500',
    fontSize: '1.1rem',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    borderBottom: isActive ? '3px solid #60a5fa' : '3px solid transparent',
  });

  return (
    <Router>
      <div style={{ fontFamily: '"Segoe UI", Roboto, Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
        
        <nav style={{ backgroundColor: '#1e3a8a', padding: '15px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ margin: '0 40px 0 0', color: '#60a5fa', letterSpacing: '1px' }}>🏫 EduManager</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <NavLink to="/" style={navLinkStyle}>Inicio</NavLink>
              <NavLink to="/estudiantes" style={navLinkStyle}>Estudiantes</NavLink>
              <NavLink to="/asistencia" style={navLinkStyle}>Asistencia</NavLink>
              <NavLink to="/evaluaciones" style={navLinkStyle}>Evaluaciones</NavLink>
            </div>
          </div>
          
          <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cerrar Sesión
          </button>
        </nav>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/asistencia" element={<Asistencia />} />
            <Route path="/evaluaciones" element={<Evaluaciones />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;