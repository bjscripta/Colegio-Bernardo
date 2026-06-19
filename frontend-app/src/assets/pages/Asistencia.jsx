import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/data-page.css';

function Asistencia() {
    const [asistencias, setAsistencias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/asistencia')
            .then((respuesta) => respuesta.json())
            .then((data) => setAsistencias(data))
            .catch(() => setError('No se pudieron cargar las asistencias'))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) {
        return (
            <>
                <Navbar />
                <p className="data-loading">Cargando asistencias...</p>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <p className="data-error">{error}</p>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="data-page">
                <header className="data-header">
                    <h1>Asistencia</h1>
                    <p>Registros de asistencia por estudiante, clase y fecha.</p>
                </header>

                {asistencias.length === 0 ? (
                    <p className="data-empty">No hay asistencias registradas.</p>
                ) : (
                    <section className="data-card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Estudiante</th>
                                    <th>Clase</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Observación</th>
                                </tr>
                            </thead>

                            <tbody>
                                {asistencias.map((asistencia) => (
                                    <tr key={asistencia.asistenciaId}>
                                        <td>{asistencia.asistenciaId}</td>
                                        <td>{asistencia.estudianteId}</td>
                                        <td>{asistencia.claseId}</td>
                                        <td>{asistencia.fecha}</td>
                                        <td>
                                            <span
                                                className={
                                                    asistencia.estado === 'PRESENTE'
                                                        ? 'status-badge status-present'
                                                        : 'status-badge status-absent'
                                                }
                                            >
                                                {asistencia.estado}
                                            </span>
                                        </td>
                                        <td>{asistencia.observacion || 'Sin observación'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}

export default Asistencia;