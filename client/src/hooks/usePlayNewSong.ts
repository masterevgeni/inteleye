import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playRandoSong } from '../services/musicApi';

export const usePlaySong = ({ openSnackbar }: { openSnackbar: (open: boolean) => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playRandoSong,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      openSnackbar(true);
    },
    onError: (error) => {
      console.error('Error in usePlaySong:', error);
    },
  });
};