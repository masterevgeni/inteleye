import { useQuery } from '@tanstack/react-query';
import { fetchSongsList } from './../services/musicApi';

const POLLING_INTERVAL_MS = 5000;

export const useSongsList = () => {
  return useQuery({
    queryKey: ['musicSongs'],
    queryFn: fetchSongsList,
    refetchInterval: POLLING_INTERVAL_MS,
    staleTime: POLLING_INTERVAL_MS / 2,
  });
};