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

export interface ChartDataPointProps {
  name: string;
  [key: string]: string | number;
}

export interface DashboardStatsProps {
  kpis: Kpis;
  genreDistribution: ChartDataPointProps[];
  topArtists: ChartDataPointProps[];
  songsByDecade: ChartDataPointProps[];
  nowPlaying: Song | null;
}

 export interface SongRowProps {
    "_id": string,
    "title":string,
    "artist": string,
    "album": string
    "genre": string,
    "duration": number,
    "releaseYear": number,
    "playCount": number,
    "__v": number,
    "createdAt": string,
    "updatedAt": string
}