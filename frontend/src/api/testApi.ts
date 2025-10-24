import api from './axiosInstance';

export const fetchData = async () => {
  try {
    const response = await api.get('/test');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};