import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtists } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchArtistsThunk = createAsyncThunk<IArtists[], void>(
  'artists/fetchArtistsThunk',
  async () => {
    const artistsResponse = await axiosApi<IArtists[]>('/artists');

    return artistsResponse.data || [];
  }
);


