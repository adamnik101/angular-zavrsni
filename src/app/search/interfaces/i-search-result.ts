import { IAlbum } from "../../core/interfaces/album/i-album";
import { IArtist } from "../../core/interfaces/artist/i-artist";
import { IPagedResponse } from "../../shared/interfaces/i-paged-response";

export interface ISearchResult {
    tracks: IPagedResponse<any[]>;
    artists: IPagedResponse<IArtist[]>;
    albums: IPagedResponse<IAlbum[]>;
}
