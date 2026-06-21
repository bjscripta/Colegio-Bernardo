import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAuthHeaders } from '../../services/authService';
import '../css/data-page.css';

function Asistencia() {
    const [asistencias, setAsistencias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarAsistencias = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/asistencia', {
                    headers: getAuthHeaders()
                });

                if (respuesta.status === 401) {
                    throw new Error('No autorizado. Inicia sesion nuevamente.');
                }

                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la asistencia.');
                }

                const data = await respuesta.json();
                setAsistencias(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarAsistencias();
    }, []);

    return (
        <>
            <Navbar />

            <main className="data-page">
                <section className="data-header">
                    <h1>Asistencia</h1>
                    <p>Registro general de asistencia de los estudiantes.</p>
                </section>

                {cargando && <p className="data-loading">Cargando asistencia...</p>}

                {error && <p className="data-error">{error}</p>}

                {!cargando && !error && asistencias.length === 0 && (
                    <p className="data-empty">No hay registros de asistencia.</p>
                )}

                {!cargando && !error && asistencias.length > 0 && (
                    <section className="data-card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Estudiante</th>
                                    <th>Clase</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Observacion</th>
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
                                        <td>{asistencia.observacion}</td>
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