import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'explore',
        loadComponent: () => import('./explore/explore.component').then(c => c.ExploreComponent)
    },
    {
        path: 'trending',
        loadComponent: () => import('./trending/trending.component').then(c => c.TrendingComponent)
    },
    {
        path: "login",
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent),
    },
    {
        path: "register",
        loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent),
    },
    {
        path: "library",
        loadComponent: () => import('./library/library.component').then(c => c.LibraryComponent)
    },
    {
        path: "playlists/:id",
        loadComponent: () => import('./core/components/playlists/playlist-detail/playlist-detail.component').then(c => c.PlaylistDetailComponent)
    },
    {
        path: "genres/:id",
        loadComponent: () => import('./core/components/genres/genre-detail/genre-detail.component').then(c => c.GenreDetailComponent)
    },
    {
        path: "artists/:id",
        loadComponent: () => import('./core/components/artists/artist-detail/artist-detail.component').then(c => c.ArtistDetailComponent)
    },
    {
        path: "albums/:id",
        loadComponent: () => import('./core/components/albums/album-detail/album-detail.component').then(c => c.AlbumDetailComponent)
    },
    {
        path: "liked",
        loadComponent: () => import('./liked-tracks/liked-tracks.component').then(c => c.LikedTracksComponent)
    },
    {
        path: "profile",
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
    },
    {
        path: "settings",
        loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent)
    },
    {
        path: "search",
        loadComponent: () => import('./search/search.component').then(c => c.SearchComponent)
    }
];
