import { BaseInterface } from "../base-interface";

export interface IAlbum extends BaseInterface {
    cover: string;
    name: string;
    tracks_count: number;
}
