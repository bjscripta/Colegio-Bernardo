import axios from 'axios';

const API_GATEWAY = 'http://localhost:8080';

const bffService = {
    // Estudiantes
    getEstudiantes: async () => {
        try {
            const response = await axios.get(`${API_GATEWAY}/estudiante`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener estudiantes', error);
            throw error;
        }
    },

    getEstudianteById: async (id) => {
        try {
            const response = await axios.get(`${API_GATEWAY}/estudiante/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener estudiante', error);
            throw error;
        }
    },

    getEstudiantesByCurso: async (curso) => {
        try {
            const response = await axios.get(`${API_GATEWAY}/estudiante/curso/${curso}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener estudiantes por curso', error);
            throw error;
        }
    },

    createEstudiante: async (estudiante) => {
        try {
            const response = await axios.post(`${API_GATEWAY}/estudiante`, estudiante);
            return response.data;
        } catch (error) {
            console.error('Error al crear estudiante', error);
            throw error;
        }
    },

    updateEstudiante: async (id, estudiante) => {
        try {
            const response = await axios.put(`${API_GATEWAY}/estudiante/${id}`, estudiante);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar estudiante', error);
            throw error;
        }
    },

    deleteEstudiante: async (id) => {
        try {
            const response = await axios.delete(`${API_GATEWAY}/estudiante/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar estudiante', error);
            throw error;
        }
    },

    // Asistencias
    getAsistencias: async () => {
        try {
            const response = await axios.get(`${API_GATEWAY}/asistencia`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener asistencias', error);
            throw error;
        }
    },

    getAsistenciasByEstudiante: async (estudianteId) => {
        try {
            const response = await axios.get(`${API_GATEWAY}/asistencia/estudiante/${estudianteId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener asistencias del estudiante', error);
            throw error;
        }
    },

    createAsistencia: async (asistencia) => {
        try {
            const response = await axios.post(`${API_GATEWAY}/asistencia`, asistencia);
            return response.data;
        } catch (error) {
            console.error('Error al crear asistencia', error);
            throw error;
        }
    },

    updateAsistencia: async (id, asistencia) => {
        try {
            const response = await axios.put(`${API_GATEWAY}/asistencia/${id}`, asistencia);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar asistencia', error);
            throw error;
        }
    },

    // Evaluaciones
    getEvaluaciones: async () => {
        try {
            const response = await axios.get(`${API_GATEWAY}/evaluacion`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener evaluaciones', error);
            throw error;
        }
    },

    createEvaluacion: async (evaluacion) => {
        try {
            const response = await axios.post(`${API_GATEWAY}/evaluacion`, evaluacion);
            return response.data;
        } catch (error) {
            console.error('Error al crear evaluación', error);
            throw error;
        }
    },

    updateEvaluacion: async (id, evaluacion) => {
        try {
            const response = await axios.put(`${API_GATEWAY}/evaluacion/${id}`, evaluacion);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar evaluación', error);
            throw error;
        }
    },

    // Calificaciones
    getCalificaciones: async () => {
        try {
            const response = await axios.get(`${API_GATEWAY}/calificacion`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener calificaciones', error);
            throw error;
        }
    },

    getCalificacionesByEstudiante: async (estudianteId) => {
        try {
            const response = await axios.get(`${API_GATEWAY}/calificacion/estudiante/${estudianteId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener calificaciones del estudiante', error);
            throw error;
        }
    },

    createCalificacion: async (calificacion) => {
        try {
            const response = await axios.post(`${API_GATEWAY}/calificacion`, calificacion);
            return response.data;
        } catch (error) {
            console.error('Error al crear calificación', error);
            throw error;
        }
    },

    updateCalificacion: async (id, calificacion) => {
        try {
            const response = await axios.put(`${API_GATEWAY}/calificacion/${id}`, calificacion);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar calificación', error);
            throw error;
        }
    }
};

export default bffService;