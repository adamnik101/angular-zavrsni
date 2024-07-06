import { IMainNavigationLink } from "../interfaces/i-main-navigation-link";

export const USER_NAVIGATION_LINKS: IMainNavigationLink[] = [
    {
        title: "My library",
        routePath: "/library",
        icon: "library_music"
    },
    {
        title: "Liked songs",
        routePath: "/liked",
        icon: "favorite"
    }
]