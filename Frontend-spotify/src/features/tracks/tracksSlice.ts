import { ITracks } from '../../types';
import { fetchTracksByIdThunk } from './tracksThunk.ts';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface ITracksState {
  Tracks: ITracks[];
  fetchTracks: boolean;
  fetchTracksById: boolean;
}

const initialState: ITracksState = {
  Tracks: [],
  fetchTracks: false,
  fetchTracksById: false,
}

export const selectTracks  = (state: RootState) => state.tracks.Tracks;

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksByIdThunk.pending, (state) => {
        state.fetchTracksById = true;
      })
      .addCase(fetchTracksByIdThunk.fulfilled, (state, { payload: tracks }) => {
        state.Tracks = tracks;
      })
      .addCase(fetchTracksByIdThunk.rejected, (state) => {
        state.fetchTracksById = false;
      });
  }
});

export const tracksReducer = tracksSlice.reducer;