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