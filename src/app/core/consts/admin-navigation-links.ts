import { IMainNavigationLink } from "../interfaces/i-main-navigation-link";

export const ADMIN_NAVIGATION_LINKS: IMainNavigationLink[] = [
    {
        title: "Admin dashboard",
        routePath: "/admin",
        icon: "admin_panel_settings"
    },
    {
        title: "Manage tracks",
        routePath: "/admin/tracks",
        icon: "music_note"
    },
    {
        title: "Manage artists",
        routePath: "/admin/artists",
        icon: "face"
    },
    {
        title: "Manage albums",
        routePath: "/admin/albums",
        icon: "album"
    },
    {
        title: "Manage users",
        routePath: "/admin/users",
        icon: "people"
    }
]