import React, { useState, useEffect } from 'react';
import bffService from '../services/bffService';

function Dashboard() {
    const [estudianteId, setEstudianteId] = useState('');
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bffStatus, setBffStatus] = useState('Verificando...');

    useEffect(() => {
        const checkBFF = async () => {
            const status = await bffService.healthCheck();
            setBffStatus(status ? 'Conectado ' : 'Desconectado ');
        };
        checkBFF();
    }, []);

    const handleBuscar = async () => {
        if (!estudianteId) {
            setError('Ingrese un ID de estudiante');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await bffService.getDashboard(estudianteId);
            setDashboard(data);
        } catch (err) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>📚 Dashboard Escolar</h1>
            <p>Estado BFF: <strong>{bffStatus}</strong></p>
            
            <div>
                <input
                    type="number"
                    placeholder="ID del estudiante"
                    value={estudianteId}
                    onChange={(e) => setEstudianteId(e.target.value)}
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button onClick={handleBuscar} disabled={loading} style={{ padding: '8px 16px' }}>
                    {loading ? 'Cargando...' : 'Buscar'}
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {dashboard && (
                <div>
                    <h2>👨‍🎓 {dashboard.estudiante?.nombre} {dashboard.estudiante?.apellido}</h2>
                    <p>📋 RUT: {dashboard.estudiante?.rut}</p>
                    <p>📖 Curso: {dashboard.estudiante?.curso}</p>
                    <p>📞 Teléfono: {dashboard.estudiante?.telefono}</p>
                    
                    <h3>📊 Resumen</h3>
                    <p>✅ Porcentaje de asistencia: {dashboard.porcentajeAsistencia}%</p>
                    <p>📈 Promedio general: {dashboard.promedioGeneral}</p>
                    
                    <h3>📝 Asistencias</h3>
                    <ul>
                        {dashboard.asistencias?.map((a, i) => (
                            <li key={i}>{a.fecha}: {a.estado}</li>
                        ))}
                    </ul>
                    
                    <h3>🎯 Calificaciones</h3>
                    <ul>
                        {dashboard.calificaciones?.map((c, i) => (
                            <li key={i}>Nota: {c.nota}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dashboard;