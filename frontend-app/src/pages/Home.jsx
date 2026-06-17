import React, { useEffect, useState } from 'react';
import bffService from '../services/bffService';

const Home = () => {
  const [stats, setStats] = useState({
    totalEstudiantes: 0,
    totalAsistencias: 0,
    totalEvaluaciones: 0,
    totalCalificaciones: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const [estudiantes, asistencias, evaluaciones, calificaciones] = await Promise.all([
        bffService.getEstudiantes(),
        bffService.getAsistencias(),
        bffService.getEvaluaciones(),
        bffService.getCalificaciones()
      ]);

      setStats({
        totalEstudiantes: estudiantes.length,
        totalAsistencias: asistencias.length,
        totalEvaluaciones: evaluaciones.length,
        totalCalificaciones: calificaciones.length
      });
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#1f2937', borderBottom: '3px solid #3b82f6', paddingBottom: '10px' }}>
        📊 Panel de Administración
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '30px' }}>
        Bienvenido al sistema integrado de gestión escolar. Aquí puedes administrar estudiantes, asistencia y evaluaciones.
      </p>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>⏳ Cargando estadísticas...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            
            {/* Tarjeta de estadísticas 1 */}
            <div style={{ ...statsCardStyle, borderLeft: '5px solid #3b82f6' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {stats.totalEstudiantes}
              </div>
              <div style={{ color: '#6b7280', marginTop: '5px', fontSize: '0.95rem' }}>Estudiantes Totales</div>
            </div>

            {/* Tarjeta de estadísticas 2 */}
            <div style={{ ...statsCardStyle, borderLeft: '5px solid #10b981' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
                {stats.totalAsistencias}
              </div>
              <div style={{ color: '#6b7280', marginTop: '5px', fontSize: '0.95rem' }}>Registros de Asistencia</div>
            </div>

            {/* Tarjeta de estadísticas 3 */}
            <div style={{ ...statsCardStyle, borderLeft: '5px solid #8b5cf6' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {stats.totalEvaluaciones}
              </div>
              <div style={{ color: '#6b7280', marginTop: '5px', fontSize: '0.95rem' }}>Evaluaciones Activas</div>
            </div>

            {/* Tarjeta de estadísticas 4 */}
            <div style={{ ...statsCardStyle, borderLeft: '5px solid #f59e0b' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {stats.totalCalificaciones}
              </div>
              <div style={{ color: '#6b7280', marginTop: '5px', fontSize: '0.95rem' }}>Calificaciones</div>
            </div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            
            {/* Tarjeta 1 */}
            <div style={{ ...cardStyle, borderTop: '5px solid #3b82f6' }}>
              <h2 style={{ color: '#3b82f6', marginTop: '0' }}>👨‍🎓 Estudiantes</h2>
              <p style={{ color: '#4b5563' }}>Administra la matrícula, información personal y datos de contacto de todo el alumnado.</p>
              <ul style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '15px', paddingLeft: '20px' }}>
                <li>Registrar nuevos estudiantes</li>
                <li>Actualizar información personal</li>
                <li>Gestionar cursos por año</li>
                <li>Contacto de emergencia</li>
              </ul>
            </div>

            {/* Tarjeta 2 */}
            <div style={{ ...cardStyle, borderTop: '5px solid #10b981' }}>
              <h2 style={{ color: '#10b981', marginTop: '0' }}>✅ Asistencia</h2>
              <p style={{ color: '#4b5563' }}>Lleva el control diario de presencias y ausencias para cada curso y asignatura.</p>
              <ul style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '15px', paddingLeft: '20px' }}>
                <li>Registro diario de asistencia</li>
                <li>Justificación de ausencias</li>
                <li>Reportes por estudiante</li>
                <li>Análisis de tendencias</li>
              </ul>
            </div>

            {/* Tarjeta 3 */}
            <div style={{ ...cardStyle, borderTop: '5px solid #8b5cf6' }}>
              <h2 style={{ color: '#8b5cf6', marginTop: '0' }}>📝 Evaluaciones</h2>
              <p style={{ color: '#4b5563' }}>Registra las calificaciones parciales, finales y genera los reportes académicos.</p>
              <ul style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '15px', paddingLeft: '20px' }}>
                <li>Crear evaluaciones</li>
                <li>Ingresar calificaciones</li>
                <li>Genera reportes de desempeño</li>
                <li>Análisis académico</li>
              </ul>
            </div>

          </div>

          <div style={{ 
            marginTop: '40px', 
            padding: '20px', 
            backgroundColor: '#eff6ff', 
            borderRadius: '8px', 
            borderLeft: '5px solid #3b82f6',
            color: '#1e40af'
          }}>
            <strong>💡 Tip:</strong> Para comenzar, navega por los módulos en la barra lateral. Puedes crear, editar y eliminar registros según sea necesario.
          </div>
        </>
      )}
    </div>
  );
};

const statsCardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '25px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export default Home;