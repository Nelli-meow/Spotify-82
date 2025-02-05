import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbums, IAlbumsMutation } from '../../types';
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


export const addNewAlbum = createAsyncThunk<void, { album: IAlbumsMutation, token: string }>(
  'albums/addNewAlbum',
  async ({ album, token }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(album) as (keyof IAlbumsMutation)[];

      keys.forEach((key) => {
        const value = album[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });


      await axiosApi.post('/albums', formData, { headers: { 'Authorization': token } });
    } catch (error) {
      console.error('Error while adding album:', error);
      throw error;
    }
  }
);


export const deleteAlbum = createAsyncThunk(
  'albums/deleteAlbum',
  async (id: string) => {
    try{
      await  axiosApi.delete(`/albums/${id}`);
    } catch (error) {
      return (error);
    }
  }
);


export const publishAlbums = createAsyncThunk(
  'albums/publishAlbums',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(`/albums/${id}/togglePublished`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
