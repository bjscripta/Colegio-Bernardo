import axios from 'axios';

const BFF_URL = 'http://localhost:9000/bff';

const bffService = {
    healthCheck: async () => {
        try {
            const response = await axios.get(`${BFF_URL}/health`);
            return response.data;
        } catch (error) {
            console.error('BFF no disponible', error);
            return null;
        }
    },

    getDashboard: async (estudianteId) => {
        try {
            const response = await axios.get(`${BFF_URL}/dashboard/${estudianteId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener dashboard', error);
            throw error;
        }
    }
};

export default bffService;