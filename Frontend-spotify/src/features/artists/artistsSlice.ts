import { IArtists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addNewArtist, fetchArtistsThunk } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';


interface IArtistsState {
  Artists: IArtists[];
  fetchArtists: boolean;
  isLoading: boolean,
}

const initialState: IArtistsState = {
  Artists: [],
  fetchArtists: false,
  isLoading: false,
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
      });
  }
});

export const artistsReducer = artistsSlice.reducer;