import { IAlbums } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAlbumsByIdThunk, fetchAlbumsThunk } from './albumsThunk.ts';


interface IAlbumsState {
  Albums: IAlbums[];
  Artist: string;
  fetchAlbums: boolean;
  fetchAlbumsById: boolean;
  isLoading: boolean,
}

const initialState: IAlbumsState = {
  Albums: [],
  Artist: '',
  fetchAlbums: false,
  fetchAlbumsById: false,
  isLoading: false,
}

export const selectAlbums  = (state: RootState) => state.albums.Albums;
export const selectArtist = (state: RootState) => state.albums.Artist;
export const selectIsLoading = (state: RootState) => state.albums.isLoading;

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
      });
  }
});

export const albumsReducer = albumsSlice.reducer;