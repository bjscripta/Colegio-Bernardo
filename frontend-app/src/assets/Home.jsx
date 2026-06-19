import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './css/home.css';

function Home() {
    return (
        <div className="home-page">
            <Navbar />

            <section className="home-container" id="inicio">
                <div className="home-text">
                    <h2>Plataforma Escolar</h2>

                    <p>
                        La plataforma del Colegio Bernardo permite centralizar la información
                        académica.
                    </p>

                    <p>
                        Su objetivo es facilitar la gestión escolar y entregar una vista clara
                        del rendimiento y seguimiento de cada alumno.
                    </p>

                    <div className="home-actions">
                        <Link to="/estudiantes" className="home-button">
                            Ver estudiantes
                        </Link>

                        <Link to="/dashboard" className="home-button secondary">
                            Ver dashboard
                        </Link>
                    </div>
                </div>

                <div className="home-image-container">
                    <img
                        src="/logo192.png"
                        alt="Colegio Bernardo"
                        className="home-image"
                    />
                </div>
            </section>

            <section className="home-modules">
                <h2 className="home-section-title">Módulos del sistema</h2>

                <div className="home-module-grid">
                    <article className="home-module-card">
                        <h3>Estudiantes</h3>
                        <p>Consulta información personal, curso, RUT y teléfono de los estudiantes.</p>
                    </article>

                    <article className="home-module-card">
                        <h3>Asistencia</h3>
                        <p>Revisa registros de asistencia por estudiante, clase, fecha y estado.</p>
                    </article>

                    <article className="home-module-card">
                        <h3>Evaluaciones</h3>
                        <p>Consulta evaluaciones, asignaturas, cursos y notas máximas registradas.</p>
                    </article>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;