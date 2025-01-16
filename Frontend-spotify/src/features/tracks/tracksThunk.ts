import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

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