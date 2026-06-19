import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';

function Navbar() {
    return (
        <header className="app-navbar">
            <Link to="/" className="app-navbar-brand">
                Colegio Bernardo
            </Link>

            <nav className="app-navbar-links">
                <Link to="/">Inicio</Link>
                <Link to="/estudiantes">Estudiantes</Link>
                <Link to="/asistencia">Asistencia</Link>
                <Link to="/evaluaciones">Evaluaciones</Link>
                <Link to="/dashboard">Dashboard</Link>
            </nav>
        </header>
    );
}

export default Navbar;