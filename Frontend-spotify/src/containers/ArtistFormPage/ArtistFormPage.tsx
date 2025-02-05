import React, { useCallback, useState } from 'react';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useNavigate } from 'react-router-dom';
import { IArtistsMutation } from '../../types';


export interface Props {
  onSubmit: (artist: IArtistsMutation) => void;
}

const initialState = {
  name: '',
  information: '',
};

const ArtistFormPage: React.FC<Props> = ({onSubmit}) => {
  const [artist, setArtist] = useState(initialState);
  const navigate = useNavigate();

  const onSubmitArtist = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!artist.name || !artist.information) {
      alert('Please name title and information');
      return;
    }

    onSubmit({...artist});
    setArtist(initialState);
    navigate('/');
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setArtist((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);


  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setArtist(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Add new Artist</h2>
      <form onSubmit={onSubmitArtist}  className="border p-4 rounded shadow bg-light">

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Artists name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={artist.name}
            onChange={inputChangeHandler}
            required
            placeholder="Nаme"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Photo
          </label>
          <div className="input-group mb-3">
            <FileInput name="image" label="Image" onGetFile={getImage}/>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="info" className="form-label">
            Information
          </label>
          <textarea
            className="form-control"
            id="information"
            name="information"
            value={artist.information}
            rows={4}
            onChange={inputChangeHandler}
            placeholder="Information..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Artist
        </button>
      </form>
    </div>
  );
};

export default ArtistFormPage;