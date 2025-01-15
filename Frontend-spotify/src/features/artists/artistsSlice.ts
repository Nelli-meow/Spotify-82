import { IArtists } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtistsThunk } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';


interface IArtistsState {
  Artists: IArtists[];
  fetchArtists: boolean;
}

const initialState: IArtistsState = {
  Artists: [],
  fetchArtists: false,
}

export const selectArtists  = (state: RootState) => state.artists.Artists;

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
  }
});

export const artistsReducer = artistsSlice.reducer;