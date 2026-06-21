import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';

function Navbar() {
    const token = localStorage.getItem('access_token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const estaLogueado = Boolean(token);

    return (
        <header className="app-navbar">
            <Link to="/" className="app-navbar-brand">
                Colegio Bernardo
            </Link>

            <nav className="app-navbar-links">
                <Link to="/">Home</Link>
                <Link to="/estudiantes">Estudiantes</Link>
                <Link to="/asistencia">Asistencia</Link>
                <Link to="/evaluaciones">Evaluaciones</Link>
                <Link to="/dashboard">Dashboard</Link>

                {estaLogueado && roles.includes('docentes') && (
                    <Link to="/docentes">Docentes</Link>
                )}

                {estaLogueado && roles.includes('administradores') && (
                    <Link to="/administradores">Administradores</Link>
                )}

                {!estaLogueado ? (
                    <Link to="/login" className="app-navbar-login">
                        Iniciar sesion
                    </Link>
                ) : (
                    <Link to="/perfil" className="app-navbar-login">
                        Mi perfil
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default Navbar;