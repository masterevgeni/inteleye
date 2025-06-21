import { playRandoSong } from './../services/musicApi';

export const usePlaySong = async () => {
  try {
    const response = await playRandoSong();
    return response;
  } catch (error) {
    console.error('Error in usePlaySong:', error);
    throw error;
  } finally {
  }
};