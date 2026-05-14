import React from 'react';

const Home = () => {
  return (
    <div>
      <h1 style={{ color: '#1f2937', borderBottom: '3px solid #3b82f6', paddingBottom: '10px' }}>
        Panel de Administración
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '30px' }}>
        Bienvenido al sistema integrado. Selecciona un módulo para comenzar a trabajar.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
        
        {/* Tarjeta 1 */}
        <div style={{ ...cardStyle, borderTop: '5px solid #3b82f6' }}>
          <h2 style={{ color: '#3b82f6', marginTop: '0' }}>👨‍🎓 Estudiantes</h2>
          <p style={{ color: '#4b5563' }}>Administra la matrícula, información personal y datos de contacto de todo el alumnado.</p>
        </div>

        {/* Tarjeta 2 */}
        <div style={{ ...cardStyle, borderTop: '5px solid #10b981' }}>
          <h2 style={{ color: '#10b981', marginTop: '0' }}>✅ Asistencia</h2>
          <p style={{ color: '#4b5563' }}>Lleva el control diario de presencias y ausencias para cada curso y asignatura.</p>
        </div>

        {/* Tarjeta 3 */}
        <div style={{ ...cardStyle, borderTop: '5px solid #8b5cf6' }}>
          <h2 style={{ color: '#8b5cf6', marginTop: '0' }}>📝 Evaluaciones</h2>
          <p style={{ color: '#4b5563' }}>Registra las calificaciones parciales, finales y genera los reportes académicos.</p>
        </div>

      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '25px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export default Home;