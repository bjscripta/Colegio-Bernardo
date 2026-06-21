import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/data-page.css';

function Administradores() {
    return (
        <>
            <Navbar />

            <main className="data-page">
                <section className="data-header">
                    <h1>Panel de administradores</h1>
                    <p>Gestion general del sistema escolar.</p>
                </section>

                <section className="data-card">
                    <div style={{ padding: '24px' }}>
                        <h2>Bienvenido administrador</h2>
                        <p>Desde aqui puedes administrar usuarios, permisos, cursos y configuraciones del sistema.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Administradores;