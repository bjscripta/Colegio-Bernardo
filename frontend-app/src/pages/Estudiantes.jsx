import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const API_URL = "http://localhost:8080/estudiante-service/api/estudiantes";

  useEffect(() => {
    axios.get(API_URL).then(res => setEstudiantes(res.data)).catch(err => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#1f2937', marginTop: '0' }}>Listado de Estudiantes</h2>
      
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', color: '#374151', borderBottom: '2px solid #d1d5db' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Apellido</th>
              <th style={thStyle}>Email</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.length > 0 ? estudiantes.map((est, index) => (
              <tr key={est.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                <td style={tdStyle}><strong>#{est.id}</strong></td>
                <td style={tdStyle}>{est.nombre}</td>
                <td style={tdStyle}>{est.apellido}</td>
                <td style={tdStyle}>{est.email}</td>
              </tr>
            )) : (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>No hay estudiantes registrados aún.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = { padding: '15px' };
const tdStyle = { padding: '15px', color: '#4b5563' };

export default Estudiantes;