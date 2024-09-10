export const API_ENDPOINTS = {
    admin: {
        dashboard: "admin/dashboard",
        albums: "admin/albums",
        artists: "admin/artists",
        genres: "admin/genres"
    },
    auth: {
        login: "auth/login",
        register: "auth/register"
    },
    home: {
        api: "home"
    },
    user: {
        albums: "me/albums",
        tracks: "me/tracks",
        artists: "me/artists",
        settings: "me/settings",
        username: "me/username",
        cover: "me/cover",
        recentlyPlayed: "me/recently-played",
        role: "auth/user-role"
    },
    genre: {
        api: "genres"
    },
    playlist: {
        api: "playlists",
        tracks: "playlists/tracks/"
    },
    search: {
        api: "search"
    },
    tracks: {
        api: "tracks",
        trending: "tracks/trending",
        newReleases: "tracks/new-releases"
    },
    albums: {
        api: "albums",
        trending: "albums/trending",
        newReleases: "albums/new-releases"
    },
    artists: {
        api: "artists",
        trending: "artists/trending"
    },
    users: {
        api: "users"
    },
    roles: {
        api: "roles"
    }
}