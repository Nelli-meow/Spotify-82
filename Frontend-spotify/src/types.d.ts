export interface IArtists {
  name: string;
  photo: string | null;
  information: string;
  _id: string;
}

export interface IAlbums {
  name: string;
  photo: string;
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