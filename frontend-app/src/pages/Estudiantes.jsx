import React, { useEffect, useState } from 'react';
import bffService from '../services/bffService';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    curso: '',
    telefono: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    setLoading(true);
    try {
      const datos = await bffService.getEstudiantes();
      setEstudiantes(datos);
      setError(null);
    } catch (err) {
      setError('Error al cargar los estudiantes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearEstudiante = async (e) => {
    e.preventDefault();
    try {
      await bffService.createEstudiante(nuevoEstudiante);
      setNuevoEstudiante({ nombre: '', apellido: '', rut: '', curso: '', telefono: '' });
      setMostrarFormulario(false);
      cargarEstudiantes();
    } catch (err) {
      setError('Error al crear el estudiante');
      console.error(err);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este estudiante?')) {
      try {
        await bffService.deleteEstudiante(id);
        cargarEstudiantes();
      } catch (err) {
        setError('Error al eliminar el estudiante');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280' }}>⏳ Cargando estudiantes...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#1f2937', marginTop: '0' }}>Listado de Estudiantes</h2>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Estudiante'}
        </button>
      </div>

      {error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>⚠️ {error}</div>}

      {mostrarFormulario && (
        <form onSubmit={handleCrearEstudiante} style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoEstudiante.nombre}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="text"
              placeholder="Apellido"
              value={nuevoEstudiante.apellido}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, apellido: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="text"
              placeholder="RUT"
              value={nuevoEstudiante.rut}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, rut: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="text"
              placeholder="Curso"
              value={nuevoEstudiante.curso}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, curso: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={nuevoEstudiante.telefono}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, telefono: e.target.value })}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Guardar Estudiante
          </button>
        </form>
      )}
      
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', color: '#374151', borderBottom: '2px solid #d1d5db' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Apellido</th>
              <th style={thStyle}>RUT</th>
              <th style={thStyle}>Curso</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.length > 0 ? estudiantes.map((est, index) => (
              <tr key={est.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                <td style={tdStyle}><strong>#{est.id}</strong></td>
                <td style={tdStyle}>{est.nombre}</td>
                <td style={tdStyle}>{est.apellido}</td>
                <td style={tdStyle}>{est.rut}</td>
                <td style={tdStyle}>{est.curso}</td>
                <td style={tdStyle}>{est.telefono}</td>
                <td style={tdStyle}>
                  <button 
                    onClick={() => handleEliminar(est.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>No hay estudiantes registrados aún.</td></tr>
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