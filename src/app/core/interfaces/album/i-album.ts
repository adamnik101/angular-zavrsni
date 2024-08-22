import { IArtist } from "../artist/i-artist";
import { BaseInterface } from "../base-interface";
import { ITrack } from "../tracks/i-track";

export interface IAlbum extends BaseInterface {
    cover: string;
    name: string;
    tracks: ITrack[];
    tracks_count: number;
    release_year: string;
    artist: IArtist;
}
