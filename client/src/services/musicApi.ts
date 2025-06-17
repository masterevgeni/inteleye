import { DashboardStats } from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/stats`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw error; 
  }
};

export const playRandoSong = async (): Promise<any> => {
  try {
    const response = await fetch(
        `${API_BASE_URL}/music/play-random`, {
            method: 'POST'
        })
    console.log('response: ', response);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw error; 
  }
};