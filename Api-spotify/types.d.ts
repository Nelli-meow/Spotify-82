export interface ArtistMutation {
    name: string;
    information: string;
    photo: string | null;
}

export interface AlbumMutation {
    name: string;
    artist: string;
    year: string;
    photo: string | null;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}