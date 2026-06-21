import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAuthHeaders } from '../../services/authService';
import '../css/data-page.css';

function Evaluaciones() {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarEvaluaciones = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/evaluacion', {
                    headers: getAuthHeaders()
                });

                if (respuesta.status === 401) {
                    throw new Error('No autorizado. Inicia sesion nuevamente.');
                }

                if (!respuesta.ok) {
                    throw new Error('No se pudieron cargar las evaluaciones.');
                }

                const data = await respuesta.json();
                setEvaluaciones(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarEvaluaciones();
    }, []);

    return (
        <>
            <Navbar />

            <main className="data-page">
                <section className="data-header">
                    <h1>Evaluaciones</h1>
                    <p>Listado de evaluaciones registradas en el sistema.</p>
                </section>

                {cargando && <p className="data-loading">Cargando evaluaciones...</p>}

                {error && <p className="data-error">{error}</p>}

                {!cargando && !error && evaluaciones.length === 0 && (
                    <p className="data-empty">No hay evaluaciones registradas.</p>
                )}

                {!cargando && !error && evaluaciones.length > 0 && (
                    <section className="data-card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                    <th>Asignatura</th>
                                    <th>Nota maxima</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluaciones.map((evaluacion) => (
                                    <tr key={evaluacion.evaluacionId}>
                                        <td>{evaluacion.evaluacionId}</td>
                                        <td>{evaluacion.nombre}</td>
                                        <td>{evaluacion.cursoId}</td>
                                        <td>{evaluacion.asignatura}</td>
                                        <td>{evaluacion.notaMaxima}</td>
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

export default Evaluaciones;