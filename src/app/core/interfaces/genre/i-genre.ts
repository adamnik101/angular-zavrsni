import { IPlaylist } from "../playlist/i-playlist";

export interface IGenre {
    id: string;
    name: string;
    cover: string;
    hex_color: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface IGenreDetail extends IGenre{
    playlists: IPlaylist[]
}