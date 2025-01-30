import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {  ITrackMutation } from '../../types';

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

      await axiosApi.post('/tracks', track, {headers: {'Authorization': token}});

    } catch (error) {
      console.error('Error while adding track:', error);
      throw error;
    }
  }
);

