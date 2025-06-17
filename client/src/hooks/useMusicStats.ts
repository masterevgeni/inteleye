import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from './../services/musicApi';

const POLLING_INTERVAL_MS = 20000;

export const useMusicStats = () => {
  return useQuery({
    queryKey: ['musicStats'],
    queryFn: fetchDashboardStats,
    refetchInterval: POLLING_INTERVAL_MS,
    staleTime: POLLING_INTERVAL_MS / 2,
  });
};