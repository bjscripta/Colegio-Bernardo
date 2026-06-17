import React, { useEffect, useState } from 'react';
import bffService from '../services/bffService';

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevaAsistencia, setNuevaAsistencia] = useState({
    estudianteId: '',
    claseId: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'presente',
    observacion: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [asistenciasData, estudiantesData] = await Promise.all([
        bffService.getAsistencias(),
        bffService.getEstudiantes()
      ]);
      setAsistencias(asistenciasData);
      setEstudiantes(estudiantesData);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearAsistencia = async (e) => {
    e.preventDefault();
    try {
      await bffService.createAsistencia(nuevaAsistencia);
      setNuevaAsistencia({
        estudianteId: '',
        claseId: '',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'presente',
        observacion: ''
      });
      setMostrarFormulario(false);
      cargarDatos();
    } catch (err) {
      setError('Error al crear la asistencia');
      console.error(err);
    }
  };

  const getEstudianteName = (estudianteId) => {
    const est = estudiantes.find(e => e.id === parseInt(estudianteId));
    return est ? `${est.nombre} ${est.apellido}` : `Estudiante #${estudianteId}`;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280' }}>⏳ Cargando asistencias...</div>;
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#1f2937', marginTop: '0' }}>Control de Asistencia</h2>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nueva Asistencia'}
        </button>
      </div>

      {error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>⚠️ {error}</div>}

      {mostrarFormulario && (
        <form onSubmit={handleCrearAsistencia} style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <select
              value={nuevaAsistencia.estudianteId}
              onChange={(e) => setNuevaAsistencia({ ...nuevaAsistencia, estudianteId: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            >
              <option value="">Seleccionar Estudiante</option>
              {estudiantes.map(est => (
                <option key={est.id} value={est.id}>
                  {est.nombre} {est.apellido}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={nuevaAsistencia.fecha}
              onChange={(e) => setNuevaAsistencia({ ...nuevaAsistencia, fecha: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <select
              value={nuevaAsistencia.estado}
              onChange={(e) => setNuevaAsistencia({ ...nuevaAsistencia, estado: e.target.value })}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            >
              <option value="presente">Presente</option>
              <option value="ausente">Ausente</option>
              <option value="tardanza">Tardanza</option>
              <option value="justificado">Justificado</option>
            </select>
            <input
              type="number"
              placeholder="Clase ID"
              value={nuevaAsistencia.claseId}
              onChange={(e) => setNuevaAsistencia({ ...nuevaAsistencia, claseId: e.target.value })}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <textarea
              placeholder="Observación"
              value={nuevaAsistencia.observacion}
              onChange={(e) => setNuevaAsistencia({ ...nuevaAsistencia, observacion: e.target.value })}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px', gridColumn: '1 / -1' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Guardar Asistencia
          </button>
        </form>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {asistencias.length > 0 ? asistencias.map(a => (
          <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>
                {getEstudianteName(a.estudianteId)}
              </div>
              <div style={{ color: '#6b7280', marginTop: '5px' }}>
                📅 {new Date(a.fecha).toLocaleDateString('es-CL')} • Clase: {a.claseId}
              </div>
              {a.observacion && <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '5px' }}>📝 {a.observacion}</div>}
            </div>
            <span style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              backgroundColor: 
                a.estado === 'presente' ? '#d1fae5' : 
                a.estado === 'ausente' ? '#fee2e2' :
                a.estado === 'tardanza' ? '#fef3c7' : '#dbeafe',
              color: 
                a.estado === 'presente' ? '#065f46' : 
                a.estado === 'ausente' ? '#991b1b' :
                a.estado === 'tardanza' ? '#92400e' : '#0c4a6e'
            }}>
              {a.estado === 'presente' && '✔️ Presente'}
              {a.estado === 'ausente' && '❌ Ausente'}
              {a.estado === 'tardanza' && '⏰ Tardanza'}
              {a.estado === 'justificado' && '✅ Justificado'}
            </span>
          </div>
        )) : (
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '20px' }}>No hay registros de asistencia.</p>
        )}
      </div>
    </div>
  );
};

export default Asistencia;