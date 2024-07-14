import { IAlbum } from "../../core/interfaces/album/i-album";
import { IArtist } from "../../core/interfaces/artist/i-artist";

export interface ITrending {
    albums: IAlbum[];
    artists: IArtist[];
    tracks: any[];
}
