import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { TrendingComponent } from './trending/trending.component';
import { LibraryComponent } from './library/library.component';
import { GenreDetailComponent } from './core/components/genres/genre-detail/genre-detail.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        data: {animation: 'HomePage'}
    },
    {
        path: 'explore',
        loadComponent: () => import('./explore/explore.component').then(c => c.ExploreComponent),
        data: {animation: 'AboutPage'}
    },
    {
        path: 'trending',
        loadComponent: () => import('./trending/trending.component').then(c => c.TrendingComponent),
        data: {animation: 'TrendingPage'},
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
        path: "genres/:id",
        component: GenreDetailComponent
    },
    {
        path: "liked",
        loadComponent: () => import('./liked-songs/liked-songs.component').then(c => c.LikedSongsComponent)
    }
];
