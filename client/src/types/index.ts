export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  releaseYear: number;
  lastPlayedAt?: string;
}

export interface NowPlayingProps {
  song: Song | null;
}

export interface Kpis {
  totalSongs: number;
  avgDuration: number;
  totalUniqueArtists: number;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface DashboardStats {
  kpis: Kpis;
  genreDistribution: ChartDataPoint[];
  topArtists: ChartDataPoint[];
  songsByDecade: ChartDataPoint[];
  nowPlaying: Song | null;
}