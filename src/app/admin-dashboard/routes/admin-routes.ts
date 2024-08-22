import { Route } from "@angular/router";
import { AdminUsersComponent } from "../components/admin-users/admin-users.component";
import { AdminTracksComponent } from "../components/admin-tracks/admin-tracks.component";
import { AdminArtistsComponent } from "../components/admin-artists/admin-artists.component";
import { AdminDashboardComponent } from "../admin-dashboard.component";
import { AdminAlbumsComponent } from "../components/admin-albums/admin-albums.component";

export const ADMIN_ROUTES: Route[] = [
    {
        path: "dashboard",
        component: AdminDashboardComponent
    },
    {
        path: "users",
        component: AdminUsersComponent
    },
    {
        path: "tracks",
        component: AdminTracksComponent
    },
    {
        path: "artists",
        component: AdminArtistsComponent
    },
    {
        path: "albums",
        component: AdminAlbumsComponent
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
    }
];