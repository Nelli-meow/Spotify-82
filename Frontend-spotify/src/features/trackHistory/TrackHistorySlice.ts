import { createSlice } from '@reduxjs/toolkit';
import { addTrackToHistory } from './TracksHistoryThunks.ts';
import { RootState } from '../../app/store.ts';
import {  TracksHistoryMutation } from '../../types';

export interface TrackHistoryState {
  tracksHistory: TracksHistoryMutation[];
  loading: boolean;
  error: string | null;
}

const initialState: TrackHistoryState = {
  tracksHistory: [],
  loading: false,
  error: null,
};


export const selectTracksHistory = (state: RootState) => state.trackHistory.tracksHistory;


const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackToHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrackToHistory.fulfilled, (state, { payload: track }) => {
        state.loading = false;
        state.tracksHistory.unshift(track);
      })
      .addCase(addTrackToHistory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
