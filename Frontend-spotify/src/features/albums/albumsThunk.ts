import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbums } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbumsThunk = createAsyncThunk<IAlbums[], void>(
  'albums/fetchAlbumsThunk',
  async () => {
    const albumsResponse = await axiosApi<IAlbums[]>('/albums');

    return albumsResponse.data || [];
  }
);

export const fetchAlbumsByIdThunk = createAsyncThunk(
  'albums/fetchAlbumsByIdThunk',
  async (id: string) => {
    try {
      const response = await axiosApi(`/albums/${id}`);
      return response.data || [];
    } catch (error) {
      return 'Error fetching albums by artist ID: ' + error;
    }
  }
);