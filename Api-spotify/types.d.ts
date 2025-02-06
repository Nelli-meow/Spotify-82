export interface ArtistMutation {
    name: string;
    information: string;
    photo: string | null;
}

export interface AlbumMutation {
    name: string;
    artist: string;
    year: string;
    image: string | null;
}

export interface TrackMutation {
    name: string;
    album: string;
    duration: string;
    number: number;
    year: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId: string;
    email: string;
}