import { IAlbums } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { addNewAlbum, deleteAlbum, fetchAlbumsByIdThunk, fetchAlbumsThunk, publishAlbums } from './albumsThunk.ts';


interface IAlbumsState {
  Albums: IAlbums[];
  Artist: string;
  fetchAlbums: boolean;
  fetchAlbumsById: boolean;
  isLoading: boolean,
  deleteAlbum: boolean;
  isPublished: boolean;
}

const initialState: IAlbumsState = {
  Albums: [],
  Artist: '',
  fetchAlbums: false,
  fetchAlbumsById: false,
  isLoading: false,
  deleteAlbum: false,
  isPublished: false,
};

export const selectAlbums  = (state: RootState) => state.albums.Albums;
export const selectArtist = (state: RootState) => state.albums.Artist;

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchAlbumsThunk.pending, (state) => {
        state.fetchAlbums = true;
      })
      .addCase(fetchAlbumsThunk.fulfilled, (state, {payload: albums}) => {
        state.fetchAlbums = false;
        state.Albums = albums;
      })
      .addCase(fetchAlbumsThunk.rejected, (state) => {
        state.fetchAlbums = false;
      })
      .addCase(fetchAlbumsByIdThunk.pending, (state) => {
        state.fetchAlbumsById = true;
      })
      .addCase(fetchAlbumsByIdThunk.fulfilled, (state, { payload }) => {
        state.Albums = payload;
        if (payload.length > 0) {
          state.Artist = payload[0].artist.name;
        }
      })
      .addCase(fetchAlbumsByIdThunk.rejected, (state) => {
        state.fetchAlbumsById = false;
      })

      .addCase(addNewAlbum.pending, (state) => {
        state.fetchAlbums = true;
      })
      .addCase(addNewAlbum.fulfilled, (state) => {
        state.fetchAlbums = false;
      })
      .addCase(addNewAlbum.rejected, (state) => {
        state.fetchAlbums = false;
      })

      .addCase(deleteAlbum.pending, (state) => {
        state.deleteAlbum = true;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.deleteAlbum = false;
        state.Albums = state.Albums.filter(Album => Album._id !== action.meta.arg);
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deleteAlbum = false;
      })

      .addCase(publishAlbums.pending, (state) => {
        state.isPublished = true;
      })
      .addCase(publishAlbums.fulfilled, (state,{payload}) => {
        state.isPublished = false;
        state.Albums = state.Albums.map((Album) =>
          Album._id === payload._id ? { ...Album, isPublished: true } : Album
        );
      })
      .addCase(publishAlbums.rejected, (state) => {
        state.isPublished = false;
      });
  }
});

export const albumsReducer = albumsSlice.reducer;