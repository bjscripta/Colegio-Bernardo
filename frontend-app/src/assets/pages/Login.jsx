import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/login.css';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const obtenerRoles = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.realm_access?.roles || [];
        } catch (error) {
            return [];
        }
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setCargando(true);
        setMensaje('');

        try {
            const respuesta = await fetch('http://localhost:8080/keycloakadapter/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!respuesta.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const data = await respuesta.json();
            const roles = obtenerRoles(data.access_token);

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('roles', JSON.stringify(roles));

            if (roles.includes('administradores')) {
                navigate('/administradores');
                return;
            }

            if (roles.includes('docentes')) {
                navigate('/docentes');
                return;
            }

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('roles');
            setMensaje('Tu usuario no tiene permisos para acceder.');
        } catch (error) {
            setMensaje('No se pudo iniciar sesion. Revisa usuario y contrasena.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="login-page">
                <section className="login-card">
                    <div className="login-brand">
                        <span className="login-badge">Colegio Bernardo</span>
                        <h1>Iniciar sesion</h1>
                        <p>Ingresa con tu cuenta para acceder al sistema escolar.</p>
                    </div>

                    <form onSubmit={iniciarSesion} className="login-form">
                        <label>
                            Usuario
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Contrasena
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>

                        {mensaje && <p className="login-error">{mensaje}</p>}

                        <button type="submit" disabled={cargando}>
                            {cargando ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Login;