import React, { useState } from 'react';
import Home from './pages/Home';
import Estudiantes from './pages/Estudiantes';
import Asistencia from './pages/Asistencia';
import Evaluaciones from './pages/Evaluaciones';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'estudiantes':
                return <Estudiantes />;
            case 'asistencia':
                return <Asistencia />;
            case 'evaluaciones':
                return <Evaluaciones />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="App" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                <div style={{ padding: '20px', borderBottom: '2px solid #e5e7eb' }}>
                    <h1 style={{ margin: '0', fontSize: '1.5rem', color: '#1f2937' }}>🎓 Colegio</h1>
                    <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '0.85rem' }}>Sistema de Gestión</p>
                </div>
                
                <nav style={{ padding: '20px 0' }}>
                    {[
                        { id: 'home', label: '🏠 Inicio', icon: 'home' },
                        { id: 'estudiantes', label: '👨‍🎓 Estudiantes', icon: 'users' },
                        { id: 'asistencia', label: '✅ Asistencia', icon: 'check' },
                        { id: 'evaluaciones', label: '📝 Evaluaciones', icon: 'book' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            style={{
                                ...navItemStyle,
                                backgroundColor: currentPage === item.id ? '#dbeafe' : 'transparent',
                                borderLeft: currentPage === item.id ? '4px solid #3b82f6' : '4px solid transparent',
                                color: currentPage === item.id ? '#1e40af' : '#6b7280',
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '20px', 
                    right: '20px',
                    padding: '15px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '8px',
                    borderLeft: '4px solid #3b82f6',
                    fontSize: '0.85rem',
                    color: '#1e40af'
                }}>
                    <strong>ℹ️ Información:</strong>
                    <p style={{ margin: '5px 0 0 0' }}>Backend conectado en puerto 8080</p>
                </div>
            </aside>

            {/* Main Content */}
            <main style={mainStyle}>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {renderPage()}
                </div>
            </main>
        </div>
    );
}

const sidebarStyle = {
    width: '280px',
    backgroundColor: 'white',
    boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '100vh'
};

const navItemStyle = {
    display: 'block',
    width: '100%',
    padding: '15px 20px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    fontWeight: '500'
};

const mainStyle = {
    flex: 1,
    padding: '40px',
    overflowY: 'auto'
};

export default App;