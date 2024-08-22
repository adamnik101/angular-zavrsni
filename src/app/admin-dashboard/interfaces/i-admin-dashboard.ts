export interface IAdminDashboard {
    album_count: number;
    artist_count: number;
    average_count_per_user: {
        playlists: string;
    };
    average_playlists_per_user: {
        avg_playlists_per_user: string;
    };
    average_tracks_per_playlist: {
        tracks_avg: string;
    };
    genre_count: number;
    liked_per_user: number;
    playlist_count: number;
    track_count: number;
    tracks_per_playlist: number;
    user_count: number;
}
