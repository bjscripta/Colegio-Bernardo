import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Evaluaciones = () => {
  const [notas, setNotas] = useState([]);
  const API_URL = "http://localhost:8080/evaluacion-service/api/evaluaciones";

  useEffect(() => {
    axios.get(API_URL).then(res => setNotas(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 style={{ color: '#1f2937', borderBottom: '3px solid #8b5cf6', paddingBottom: '10px' }}>Registro de Notas</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '25px' }}>
        {notas.length > 0 ? notas.map(n => (
          <div key={n.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            borderLeft: '6px solid #8b5cf6',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#4c1d95' }}>📚 {n.materia}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Estudiante ID: {n.estudianteId}</span>
              <span style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: n.calificacion >= 4.0 ? '#059669' : '#dc2626' 
              }}>
                {n.calificacion}
              </span>
            </div>
          </div>
        )) : (
          <p style={{ color: '#9ca3af', width: '100%', textAlign: 'center' }}>No hay evaluaciones registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Evaluaciones;