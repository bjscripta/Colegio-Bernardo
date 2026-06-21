import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAuthHeaders } from '../../services/authService';
import '../css/data-page.css';

function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarEstudiantes = async () => {
            try {
                const respuesta = await fetch('http://localhost:8080/estudiante', {
                    headers: getAuthHeaders()
                });

                if (respuesta.status === 401) {
                    throw new Error('No autorizado. Inicia sesion nuevamente.');
                }

                if (!respuesta.ok) {
                    throw new Error('No se pudieron cargar los estudiantes.');
                }

                const data = await respuesta.json();
                setEstudiantes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarEstudiantes();
    }, []);

    return (
        <>
            <Navbar />

            <main className="data-page">
                <section className="data-header">
                    <h1>Estudiantes</h1>
                    <p>Listado general de estudiantes registrados en el sistema.</p>
                </section>

                {cargando && <p className="data-loading">Cargando estudiantes...</p>}

                {error && <p className="data-error">{error}</p>}

                {!cargando && !error && estudiantes.length === 0 && (
                    <p className="data-empty">No hay estudiantes registrados.</p>
                )}

                {!cargando && !error && estudiantes.length > 0 && (
                    <section className="data-card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>RUT</th>
                                    <th>Curso</th>
                                    <th>Telefono</th>
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