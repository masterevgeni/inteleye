import { useMutation } from '@tanstack/react-query';
import { playRandoSong } from './../services/musicApi';

export const usePlaySong = async () => {
  try {
    const response = await playRandoSong();
    // console.log('response:', response);
    return response;
    // return useMutation({
    // mutationFn: playRandoSong,
    // onSuccess: (data) => {
    //   console.log('Song played successfully:', data);
    // },
    // onError: (error) => {
    //   console.error('Error playing song:', error);
    // },
    // });

  } catch (error) {
    console.error('Error in usePlaySong:', error);
    throw error;
  } finally {
    console.log('usePlaySong hook executed');
  }
};