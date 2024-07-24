import { IAlbum } from "../album/i-album";
import { BaseInterface } from "../base-interface";
import { ITrack } from "../tracks/i-track";

export interface IArtist extends BaseInterface{
    cover: string;
    name: string;
    albums_count: number;
    tracks_count: number;
    features_count: number;
    monthly_listeners: number;
    featured_albums: IAlbum[];
    albums: IAlbum[];
    tracks: ITrack[];
    verified: boolean;
    followed_by_count: number;
}
