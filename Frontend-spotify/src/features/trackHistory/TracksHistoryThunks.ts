import { TracksHistoryMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const addTrackToHistory = createAsyncThunk<TracksHistoryMutation, string, { state: RootState }>(
  'track-history/addTrackToHistory',
  async (trackId, { getState }) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        console.log('No token');
      }

      const response = await axiosApi.post<TracksHistoryMutation>(
        '/track-history',
        { trackId },
        {
          headers: {
            'Authorization': token,
          },
        }
      );

      console.log(response.data);

      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
);



