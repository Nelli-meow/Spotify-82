import { ITracks } from '../../types';
import { addNewTrack, fetchTracksByIdThunk } from './tracksThunk.ts';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface ITracksState {
  Tracks: ITracks[];
  fetchTracks: boolean;
  fetchTracksById: boolean;
  isLoading: boolean;
}

const initialState: ITracksState = {
  Tracks: [],
  fetchTracks: false,
  fetchTracksById: false,
  isLoading: false,
};

export const selectTracks  = (state: RootState) => state.tracks.Tracks;
export const selectIsLoading = (state: RootState) => state.tracks.isLoading;

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
      })

      .addCase(addNewTrack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewTrack.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewTrack.rejected, (state) => {
        state.isLoading = false;
      });

  }
});

export const tracksReducer = tracksSlice.reducer;