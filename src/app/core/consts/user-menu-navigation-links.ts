import { IMainNavigationLink } from "../interfaces/i-main-navigation-link";

export const USER_MENU_NAVIGATION_LINKS: IMainNavigationLink[] = [
    {
        title: "Profile",
        routePath: "profile",
        icon: "account_box"
    },
    {
        title: "Settings",
        routePath: "settings",
        icon: "settings"
    },
    {
        title: "Logout",
        routePath: null,
        icon: "logout"
    }
]