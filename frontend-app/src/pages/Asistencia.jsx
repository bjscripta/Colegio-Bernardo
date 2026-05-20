import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([]);
  const API_URL = "http://localhost:8080/asistencia-service/api/asistencias";

  useEffect(() => {
    axios.get(API_URL).then(res => setAsistencias(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#1f2937', marginTop: '0' }}>Control de Asistencia</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {asistencias.length > 0 ? asistencias.map(a => (
          <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>Estudiante ID: {a.estudianteId}</span>
              <span style={{ marginLeft: '15px', color: '#6b7280' }}>📅 {a.fecha}</span>
            </div>
            <span style={{
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              backgroundColor: a.presente ? '#d1fae5' : '#fee2e2',
              color: a.presente ? '#065f46' : '#991b1b'
            }}>
              {a.presente ? '✔️ Presente' : '❌ Ausente'}
            </span>
          </div>
        )) : (
          <p style={{ color: '#9ca3af', textAlign: 'center' }}>No hay registros de asistencia.</p>
        )}
      </div>
    </div>
  );
};

export default Asistencia;