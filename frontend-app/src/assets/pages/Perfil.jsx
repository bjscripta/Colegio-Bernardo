import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/data-page.css';

function Perfil() {
    const navigate = useNavigate();

    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    const cerrarSesion = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('roles');
        navigate('/login');
    };

    return (
        <>
            <Navbar />

            <main className="data-page">
                <section className="data-header">
                    <h1>Mi perfil</h1>
                    <p>Informacion de tu sesion actual.</p>
                </section>

                <section className="data-card">
                    <div style={{ padding: '24px' }}>
                        <h2>Sesion activa</h2>

                        <p>
                            <strong>Roles:</strong>{' '}
                            {roles.length > 0 ? roles.join(', ') : 'Sin roles registrados'}
                        </p>

                        <button type="button" onClick={cerrarSesion}>
                            Cerrar sesion
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Perfil;