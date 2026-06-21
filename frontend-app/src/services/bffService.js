import axios from 'axios';
import { getAuthHeaders } from './authService';

const BFF_URL = 'http://localhost:8080/bff';

const bffService = {
    healthCheck: async () => {
        const response = await axios.get(`${BFF_URL}/health`, {
            headers: getAuthHeaders()
        });
        return response.data;
    },

    getDashboard: async (estudianteId) => {
        const response = await axios.get(`${BFF_URL}/dashboard/${estudianteId}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    }
};

export default bffService;