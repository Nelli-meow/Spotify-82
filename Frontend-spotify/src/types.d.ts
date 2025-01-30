export interface IArtists {
  name: string;
  photo: string | null;
  information: string;
  _id: string;
}

export interface IAlbums {
  name: string;
  image: string;
  number: string;
  year: string;
  _id: string;
}

export interface ITracks {
  name: string;
  duration: string;
  number: string;
  year: string;
  _id: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
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
}

export interface TracksHistoryData {
  _id: string;
  userId: string;
  trackId: string;
  datetime: string;
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
