import { IAlbum } from "../album/i-album";
import { IArtist } from "../artist/i-artist";
import { BaseInterface } from "../base-interface";

export interface ITrack extends BaseInterface {
    title: string;
    cover: string;
    owner: IArtist;
    duration: string;
    explicit: boolean;
    features: IArtist[];
    path: string;
    track_plays_count: number;
    album: IAlbum | null;

    owner_id: string;
    genre_id: string;
    albumId: string | null;

    pivot: any;
}
