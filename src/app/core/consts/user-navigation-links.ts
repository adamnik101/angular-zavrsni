import { EnumActions } from "../../shared/enums/enum-actions";
import { PlaylistFormComponent } from "../components/playlists/playlist-form/playlist-form.component";
import { IMainNavigationLink } from "../interfaces/i-main-navigation-link";

export const USER_NAVIGATION_LINKS: IMainNavigationLink[] = [
    {
        title: "My library",
        routePath: "/library",
        icon: "library_music",
        action: {
            id: EnumActions.Create,
            dialogConfig: {
                component: PlaylistFormComponent,
                dimensions: {
                    width: "500px",
                    height: "auto",
                    customPanel: "playlist-form",
                }
            }
        }
    },
    {
        title: "Liked songs",
        routePath: "/liked",
        icon: "favorite"
    }
]