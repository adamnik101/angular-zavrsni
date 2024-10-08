export interface IPlaylist {
    id: string;
    title: string;
    image_url: string | null;
    description: string;
    tracks: any[];
    tracks_count: number;
    user_id: string;
    latest_added: string;
}
