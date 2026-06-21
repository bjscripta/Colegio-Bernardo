import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/data-page.css';

function Docentes() {
    return (
        <>
            <Navbar />

            <main className="data-page">
                <section className="data-header">
                    <h1>Panel de docentes</h1>
                    <p>Acceso a informacion academica, asistencia y evaluaciones.</p>
                </section>

                <section className="data-card">
                    <div style={{ padding: '24px' }}>
                        <h2>Bienvenido docente</h2>
                        <p>Desde aqui puedes revisar estudiantes, asistencias, evaluaciones y dashboard escolar.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Docentes;