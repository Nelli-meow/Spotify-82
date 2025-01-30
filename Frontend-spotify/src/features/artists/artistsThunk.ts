import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtists, IArtistsMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchArtistsThunk = createAsyncThunk<IArtists[], void>(
  'artists/fetchArtistsThunk',
  async () => {
    const artistsResponse = await axiosApi<IArtists[]>('/artists');

    return artistsResponse.data || [];
  }
);

export const addNewArtist = createAsyncThunk<void, { artist: IArtistsMutation, token: string }>(
  'artists/addNewArtist',
  async ({ artist, token }) => {
    const formData = new FormData();

    const keys = Object.keys(artist) as (keyof IArtistsMutation)[];

    keys.forEach((key) => {
      const value = artist[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData, { headers: { 'Authorization': token } });
  }
);