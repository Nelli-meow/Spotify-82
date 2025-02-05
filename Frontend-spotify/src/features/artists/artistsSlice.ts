import { IArtists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addNewArtist, deleteArtist, fetchArtistsThunk, publishArtist } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';


interface IArtistsState {
  Artists: IArtists[];
  fetchArtists: boolean;
  isLoading: boolean,
  deleteArtist: boolean;
  isPublished: boolean;
}

const initialState: IArtistsState = {
  Artists: [],
  fetchArtists: false,
  isLoading: false,
  deleteArtist: false,
  isPublished: false,
};

export const selectArtists  = (state: RootState) => state.artists.Artists;
export const selectIsLoading = (state: RootState) => state.artists.isLoading;

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchArtistsThunk.pending, (state) => {
        state.fetchArtists = true;
      })
      .addCase(fetchArtistsThunk.fulfilled, (state, {payload: artists}) => {
        state.fetchArtists = false;
        state.Artists = artists;
      })
      .addCase(fetchArtistsThunk.rejected, (state) => {
        state.fetchArtists = false;
      })

      .addCase(addNewArtist.pending, (state) => {
        state.fetchArtists = true;
      })
      .addCase(addNewArtist.fulfilled, (state) => {
        state.fetchArtists = false;
      })
      .addCase(addNewArtist.rejected, (state) => {
        state.fetchArtists = false;
      })

      .addCase(deleteArtist.pending, (state) => {
        state.deleteArtist = true;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.deleteArtist = false;
        state.Artists = state.Artists.filter(artist => artist._id !== action.meta.arg);
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.deleteArtist = false;
      })

      .addCase(publishArtist.pending, (state) => {
        state.isPublished = true;
      })
      .addCase(publishArtist.fulfilled, (state,{payload}) => {
        state.isPublished = false;
        state.Artists = state.Artists.map((artist) =>
          artist._id === payload._id ? { ...artist, isPublished: true } : artist
        );
      })
      .addCase(publishArtist.rejected, (state) => {
        state.isPublished = false;
      });
  }
});

export const artistsReducer = artistsSlice.reducer;