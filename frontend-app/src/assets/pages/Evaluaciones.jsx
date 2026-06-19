import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/data-page.css';

function Evaluaciones() {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/evaluacion')
            .then((respuesta) => respuesta.json())
            .then((data) => setEvaluaciones(data))
            .catch(() => setError('No se pudieron cargar las evaluaciones'))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) {
        return (
            <>
                <Navbar />
                <p className="data-loading">Cargando evaluaciones...</p>
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
                    <h1>Evaluaciones</h1>
                    <p>Evaluaciones registradas por curso y asignatura.</p>
                </header>

                {evaluaciones.length === 0 ? (
                    <p className="data-empty">No hay evaluaciones registradas.</p>
                ) : (
                    <section className="data-card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Curso</th>
                                    <th>Asignatura</th>
                                    <th>Nota máxima</th>
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