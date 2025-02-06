import { ITracks } from '../../types';
import { addNewTrack, deleteTrack, fetchTracksByIdThunk, fetchTracksThunk, publishTracks } from './tracksThunk.ts';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface ITracksState {
  Tracks: ITracks[];
  fetchTracks: boolean;
  fetchTracksById: boolean;
  isLoading: boolean;
  deleteTrack: boolean;
  isPublished: boolean;
}

const initialState: ITracksState = {
  Tracks: [],
  fetchTracks: false,
  fetchTracksById: false,
  isLoading: false,
  deleteTrack: false,
  isPublished: false,
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

      .addCase(fetchTracksThunk.pending, (state) => {
        state.fetchTracksById = true;
      })
      .addCase(fetchTracksThunk.fulfilled, (state, { payload: tracks }) => {
        state.Tracks = tracks;
      })
      .addCase(fetchTracksThunk.rejected, (state) => {
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
      })

      .addCase(deleteTrack.pending, (state) => {
        state.deleteTrack = true;
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.deleteTrack = false;
        state.Tracks = state.Tracks.filter(track => track._id !== action.meta.arg);
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deleteTrack = false;
      })

      .addCase(publishTracks.pending, (state) => {
        state.isPublished = true;
      })
      .addCase(publishTracks.fulfilled, (state,{payload}) => {
        state.isPublished = false;
        state.Tracks = state.Tracks.map((track) =>
          track._id === payload._id ? { ...track, isPublished: true } : track
        );
      })
      .addCase(publishTracks.rejected, (state) => {
        state.isPublished = false;
      });

  }
});

export const tracksReducer = tracksSlice.reducer;