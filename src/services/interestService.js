
import axiosInstance from '../axiosInstance';

export const getInterests = async () => {
  try {
    const response = await axiosInstance.get('/interests');
    return response.data;
  } catch (error) {
    console.error('Error fetching interests:', error);
    throw error;
  }
};

export const addInterest = async (description) => {
  try {
    const response = await axiosInstance.post('/interests', { description });
    return response.data;
  } catch (error) {
    console.error('Error adding interest:', error);
    throw error;
  }
};

export const deleteInterest = async (id) => {
  try {
    const response = await axiosInstance.delete(`/interests/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting interest:', error);
    throw error;
  }
};
