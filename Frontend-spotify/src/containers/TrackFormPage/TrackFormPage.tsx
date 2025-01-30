import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { ITrackMutation } from '../../types';
import { selectAlbums } from '../../features/albums/albumsSlice.ts';


export interface Props {
  onSubmit: (track: ITrackMutation) => void;
}

const initialState = {
  name: '',
  album: '',
};

const TrackFormPage: React.FC<Props> = ({onSubmit}) => {
  const [track, setTrack] = useState(initialState);
  const navigate = useNavigate();
  const albums = useAppSelector(selectAlbums);

  const onSubmitAlbum = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!track.name || !track.album) {
      alert('Fill out all the fields');
      return;
    }

    onSubmit(track);

    console.log(track);

    setTrack(initialState);
    navigate('/');
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setTrack((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);


  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Add new Album</h2>
      <form onSubmit={onSubmitAlbum} className="border p-4 rounded shadow bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Track name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={track.name}
            onChange={inputChangeHandler}
            required
            placeholder="Nаme"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="info" className="form-label">
            albums
          </label>
          <select
            id="album"
            name="album"
            className="form-select"
            value={track.album}
            onChange={inputChangeHandler}
            required
          >
            <option value="" disabled>
              Select an album
            </option>
            {
              albums.map((albums) => (
                <option key={albums._id} value={albums._id}>{albums.name}</option>
              ))
            }
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Track
        </button>
      </form>
    </div>
  );
};

export default TrackFormPage;