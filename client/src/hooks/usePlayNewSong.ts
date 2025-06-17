import { useMutation } from '@tanstack/react-query';
import { playRandoSong } from './../services/musicApi';

export const usePlaySong = async() => {
  try{
    const resp = await playRandoSong(); 
    console.log('resp:',resp);
        return resp;
    // return useMutation({
    // mutationFn: playRandoSong,
    // onSuccess: (data) => {
    //   console.log('Song played successfully:', data);
    // },
    // onError: (error) => {
    //   console.error('Error playing song:', error);
    // },
  // });

  }catch(error) {
    console.error('Error in usePlaySong:', error);
    throw error;
  }finally {
    console.log('usePlaySong hook executed');
  }
};