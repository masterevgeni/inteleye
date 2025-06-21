import { DashboardStatsProps } from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

export const fetchDashboardStats = async (): Promise<DashboardStatsProps> => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/stats`);
    
    if (!response.ok) {
      throw new Error('Error on load dashboard data, network response was not ok');
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
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw error; 
  }
};

export const fetchSongsList = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/music/songs`);
    
    if (!response.ok) {
      throw new Error('Error on load song list, network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw error; 
  }
};