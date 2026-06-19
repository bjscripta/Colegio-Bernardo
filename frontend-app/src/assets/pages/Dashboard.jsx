import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import bffService from '../../services/bffService';
import '../css/dashboard.css';

function Dashboard() {
    const [estudianteId, setEstudianteId] = useState('');
    const [dashboard, setDashboard] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const buscarDashboard = async () => {
        if (!estudianteId) {
            setError('Ingrese un ID de estudiante');
            return;
        }

        setCargando(true);
        setError('');
        setDashboard(null);

        try {
            const data = await bffService.getDashboard(estudianteId);
            setDashboard(data);
        } catch (err) {
            setError('No se pudo cargar el dashboard del estudiante');
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="dashboard-page">
                <header className="dashboard-header">
                    <h1>Dashboard Escolar</h1>
                    <p>Consulta el resumen académico y de asistencia de un estudiante.</p>
                </header>

                <section className="dashboard-search">
                    <input
                        type="number"
                        placeholder="ID del estudiante"
                        value={estudianteId}
                        onChange={(e) => setEstudianteId(e.target.value)}
                    />

                    <button onClick={buscarDashboard} disabled={cargando}>
                        {cargando ? 'Buscando...' : 'Buscar'}
                    </button>
                </section>

                {error && (
                    <p className="dashboard-error">
                        {error}
                    </p>
                )}

                {dashboard && (
                    <section className="dashboard-grid">
                        <article className="dashboard-card">
                            <h2>Datos del estudiante</h2>
                            <p><strong>Nombre:</strong> {dashboard.estudiante?.nombre} {dashboard.estudiante?.apellido}</p>
                            <p><strong>RUT:</strong> {dashboard.estudiante?.rut}</p>
                            <p><strong>Curso:</strong> {dashboard.estudiante?.curso}</p>
                            <p><strong>Teléfono:</strong> {dashboard.estudiante?.telefono}</p>
                        </article>

                        <article className="dashboard-card">
                            <h2>Resumen</h2>

                            <div className="dashboard-summary">
                                <div className="summary-box">
                                    <strong>Asistencia</strong>
                                    <span>{dashboard.porcentajeAsistencia}%</span>
                                </div>

                                <div className="summary-box">
                                    <strong>Promedio general</strong>
                                    <span>{dashboard.promedioGeneral}</span>
                                </div>
                            </div>
                        </article>

                        <article className="dashboard-card dashboard-full">
                            <h2>Asistencias</h2>

                            {dashboard.asistencias?.length > 0 ? (
                                <ul className="dashboard-list">
                                    {dashboard.asistencias.map((asistencia) => (
                                        <li key={asistencia.asistenciaId}>
                                            {asistencia.fecha} - {asistencia.estado}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay asistencias registradas.</p>
                            )}
                        </article>

                        <article className="dashboard-card dashboard-full">
                            <h2>Calificaciones</h2>

                            {dashboard.calificaciones?.length > 0 ? (
                                <ul className="dashboard-list">
                                    {dashboard.calificaciones.map((calificacion) => (
                                        <li key={calificacion.calificacionId}>
                                            Nota: {calificacion.nota}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay calificaciones registradas.</p>
                            )}
                        </article>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}

export default Dashboard;