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

export const deleteArtist = createAsyncThunk(
  'artists/deleteArtist',
  async (id: string) => {
    try{
      await  axiosApi.delete(`/artists/${id}`);
    } catch (error) {
      return (error);
    }
  }
);

export const publishArtist = createAsyncThunk(
  'artists/publishArtist',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(`/artists/${id}/togglePublished`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
