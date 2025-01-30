import FileInput from '../../components/FileInput/FileInput.tsx';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAlbumsMutation } from '../../types';
import { useAppSelector } from '../../app/hooks.ts';
import { selectArtists } from '../../features/artists/artistsSlice.ts';

export interface Props {
  onSubmit: (album: IAlbumsMutation) => void;
}

const initialState = {
  name: '',
  artist: '',
  image: '',
  year: ''
};

const AlbumFormPage: React.FC<Props> = ({onSubmit}) => {
  const [album, setAlbum] = useState(initialState);
  const navigate = useNavigate();
  const artists = useAppSelector(selectArtists);

  const onSubmitAlbum = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!album.name || !album.artist) {
      alert('Fill out all the fields');
      return;
    }

    onSubmit({
      ...album
    });

    setAlbum(initialState);
    navigate('/');
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setAlbum((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);


  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setAlbum(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Add new Album</h2>
      <form onSubmit={onSubmitAlbum} className="border p-4 rounded shadow bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Albums name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={album.name}
            onChange={inputChangeHandler}
            required
            placeholder="Nаme"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            image
          </label>
          <div className="input-group mb-3">
            <FileInput name="image" label="Image" onGetFile={getImage}/>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="info" className="form-label">
            artist
          </label>
          <select
            id="artist"
            name="artist"
            className="form-select"
            value={album.artist}
            onChange={inputChangeHandler}
            required
          >
            <option value="di" disabled>
              Select an artist
            </option>
            {
              artists.map((artist) => (
                <option key={artist._id} value={artist._id}>{artist.name}</option>
              ))
            }
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AlbumFormPage;