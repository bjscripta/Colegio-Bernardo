import React, { useEffect, useState } from 'react';
import bffService from '../services/bffService';

const Evaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nuevaEvaluacion, setNuevaEvaluacion] = useState({
    nombre: '',
    cursoId: '',
    asignatura: '',
    notaMaxima: 7.0
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [evaluacionesData, calificacionesData] = await Promise.all([
        bffService.getEvaluaciones(),
        bffService.getCalificaciones()
      ]);
      setEvaluaciones(evaluacionesData);
      setCalificaciones(calificacionesData);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCrearEvaluacion = async (e) => {
    e.preventDefault();
    try {
      await bffService.createEvaluacion(nuevaEvaluacion);
      setNuevaEvaluacion({ nombre: '', cursoId: '', asignatura: '', notaMaxima: 7.0 });
      setMostrarFormulario(false);
      cargarDatos();
    } catch (err) {
      setError('Error al crear la evaluación');
      console.error(err);
    }
  };

  const getCalificacionesForEvaluacion = (evaluacionId) => {
    return calificaciones.filter(c => c.evaluacionId === evaluacionId);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#6b7280' }}>⏳ Cargando evaluaciones...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#1f2937', borderBottom: '3px solid #8b5cf6', paddingBottom: '10px', marginTop: '0' }}>Registro de Notas y Evaluaciones</h2>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nueva Evaluación'}
        </button>
      </div>

      {error && <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>⚠️ {error}</div>}

      {mostrarFormulario && (
        <form onSubmit={handleCrearEvaluacion} style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              placeholder="Nombre de la Evaluación"
              value={nuevaEvaluacion.nombre}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, nombre: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="number"
              placeholder="Curso ID"
              value={nuevaEvaluacion.cursoId}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, cursoId: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="text"
              placeholder="Asignatura"
              value={nuevaEvaluacion.asignatura}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, asignatura: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
            <input
              type="number"
              placeholder="Nota Máxima"
              value={nuevaEvaluacion.notaMaxima}
              onChange={(e) => setNuevaEvaluacion({ ...nuevaEvaluacion, notaMaxima: parseFloat(e.target.value) })}
              step="0.1"
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '5px' }}
            />
          </div>
          <button 
            type="submit" 
            style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Guardar Evaluación
          </button>
        </form>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '25px' }}>
        {evaluaciones.length > 0 ? evaluaciones.map(evaluacion => (
          <div key={evaluacion.id} style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            borderLeft: '6px solid #8b5cf6',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#4c1d95' }}>📚 {evaluacion.nombre}</h3>
            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '15px' }}>
              <div>Asignatura: <strong>{evaluacion.asignatura}</strong></div>
              <div>Nota Máxima: <strong>{evaluacion.notaMaxima}</strong></div>
            </div>
            
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#374151' }}>Calificaciones</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {getCalificacionesForEvaluacion(evaluacion.id).length > 0 ? 
                  getCalificacionesForEvaluacion(evaluacion.id).map(cal => (
                    <div key={cal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                      <span style={{ color: '#6b7280' }}>Est. #{cal.estudianteId}</span>
                      <span style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold', 
                        color: cal.nota >= 4.0 ? '#059669' : '#dc2626',
                        backgroundColor: cal.nota >= 4.0 ? '#dcfce7' : '#fee2e2',
                        padding: '4px 12px',
                        borderRadius: '12px'
                      }}>
                        {cal.nota}
                      </span>
                    </div>
                  )) 
                  : <p style={{ color: '#9ca3af', fontSize: '0.9rem', margin: '0' }}>Sin calificaciones</p>
                }
              </div>
            </div>
          </div>
        )) : (
          <p style={{ color: '#9ca3af', width: '100%', textAlign: 'center', gridColumn: '1 / -1' }}>No hay evaluaciones registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Evaluaciones;