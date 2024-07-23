import { ISettings } from "../../../settings/interfaces/settings/i-settings";
import { IArtist } from "../artist/i-artist";
import { IPlaylist } from "../playlist/i-playlist";

export interface IUser {
    id: string;
    cover: string;
    email: string;
    username: string;

    liked_tracks: any[];
    liked_albums: any[];
    playlists: IPlaylist[];
    followings: IArtist[];
    
    settings: ISettings;
}
