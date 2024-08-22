import { IMainNavigationLink } from "../interfaces/i-main-navigation-link";

export const MAIN_NAVIGATION_LINKS: IMainNavigationLink[] = [
    {
        title: "Admin dashboard",
        routePath: "/admin",
        icon: "admin_panel_settings"
    },
    {
        title: "Home",
        routePath: "/home",
        icon: "home"
    },
    {
        title: "Explore",
        routePath: "/explore",
        icon: "search"
    },
    {
        title: "Trending",
        routePath: "/trending",
        icon: "whatshot"
    }
]