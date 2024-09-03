import { ITabMenu } from "../../shared/interfaces/i-tab-menu";

export const ADMIN_DASHBOARD_LINKS: ITabMenu = {
    links: [
        {
            id: "users",
            title: "Users",
            routePath: "/admin/users"
        },
        {
            id: "tracks",
            title: "Tracks",
            routePath: "/admin/tracks"
        },
        {
            id: "albums",
            title: "Albums",
            routePath: "/admin/albums"
        },
        {
            id: "genres",
            title: "Genres",
            routePath: "/admin/genres"
        }
    ]
}