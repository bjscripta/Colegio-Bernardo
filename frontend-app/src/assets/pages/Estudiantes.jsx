import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../css/data-page.css';

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/estudiante')
            .then((respuesta) => respuesta.json())
            .then((data) => setEstudiantes(data))
            .catch(() => setError('No se pudieron cargar los estudiantes'))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) {
        return (
            <>
                <Navbar />
                <p className="data-loading">Cargando estudiantes...</p>
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
                    <h1>Estudiantes</h1>
                    <p>Listado general de estudiantes registrados en el sistema.</p>
                </header>

                {estudiantes.length === 0 ? (
                    <p className="data-empty">No hay estudiantes registrados.</p>
                ) : (
                    <section className="data-card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>RUT</th>
                                    <th>Curso</th>
                                    <th>Teléfono</th>
                                </tr>
                            </thead>

                            <tbody>
                                {estudiantes.map((estudiante) => (
                                    <tr key={estudiante.id}>
                                        <td>{estudiante.id}</td>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.apellido}</td>
                                        <td>{estudiante.rut}</td>
                                        <td>{estudiante.curso}</td>
                                        <td>{estudiante.telefono}</td>
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

export default Estudiantes;