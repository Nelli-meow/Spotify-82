import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITrackMutation, ITracks } from '../../types';


export const fetchTracksThunk = createAsyncThunk<ITracks[], void>(
  'tracks/fetchTracksThunk',
  async () => {
    const artistsResponse = await axiosApi<ITracks[]>('/tracks');

    return artistsResponse.data || [];
  }
);

export const fetchTracksByIdThunk = createAsyncThunk(
  'tracks/fetchTracksByIdThunk',
  async (id: string) => {
    try {
      const response = await axiosApi(`/tracks/${id}`);
      return response.data || [];
    } catch (error) {
      return 'Error fetching albums by artist ID: ' + error;
    }
  }
);

export const addNewTrack = createAsyncThunk<void, { track: ITrackMutation, token: string }>(
  'tracks/addNewTrack',
  async ({ track, token }) => {
    try {

      await axiosApi.post('/tracks', track, { headers: { 'Authorization': `Bearer ${token}` } });

    } catch (error) {
      console.error('Error while adding track:', error);
      throw error;
    }
  }
);

export const deleteTrack = createAsyncThunk(
  'tracks/deleteTrack',
  async (id: string) => {
    try{
      await  axiosApi.delete(`/tracks/${id}`);
    } catch (error) {
      return (error);
    }
  }
);

export const publishTracks = createAsyncThunk(
  'tracks/publishTracks',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(`/tracks/${id}/togglePublished`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

