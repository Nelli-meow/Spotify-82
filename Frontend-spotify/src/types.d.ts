export interface IArtists {
  name: string;
  photo: string | null;
  information: string;
  isPublished: boolean;
  _id: string;
}

export interface IAlbums {
  name: string;
  image: string;
  year: string;
  isPublished: boolean;
  _id: string;
}

export interface ITracks {
  name: string;
  duration: string;
  number: number;
  year: string;
  isPublished: boolean;
  _id: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  image: string | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
  image?: string | null;
  displayName: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TracksHistoryMutation {
  _id: string;
  name: string;
  duration: string;
  artist: string;
  datetime: string;
  trackId: ITracks;
}

export interface IArtistsMutation {
  name: string;
  information: string;
}

export interface IAlbumsMutation {
  name: string;
  artist: string;
  image: string | null;
}

export interface ITrackMutation {
  name: string;
  album: string;
  duration: string;
  number: number;
  year: string;
}