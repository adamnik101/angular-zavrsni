import { ISettings } from "../../../settings/interfaces/settings/i-settings";
import { IArtist } from "../artist/i-artist";
import { BaseInterface } from "../base-interface";
import { IPlaylist } from "../playlist/i-playlist";

export interface IUser  extends BaseInterface{
    cover: string;
    email: string;
    username: string;

    role: any;
    role_id: string;
    
    liked_tracks: any[];
    liked_albums: any[];
    playlists: IPlaylist[];
    followings: IArtist[];
    
    settings: ISettings;
}
