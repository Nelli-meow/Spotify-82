import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { deleteArtist, fetchArtistsThunk } from './artistsThunk.ts';
import { selectArtists, selectIsLoading } from './artistsSlice.ts';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import { Link } from 'react-router-dom';
import PreLoader from '../../components/UI/PreLoader.tsx';


const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchArtistsThunk());
  }, [dispatch]);

  const onDelete = (id: string) => {
    dispatch(deleteArtist(id));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="text-center">Artists</h3>
        {
          <Link to="/artists/new" className="h4 text-decoration-none btn btn-dark">Add new Artist</Link>
        }
      </div>
      {isLoading ? (
        <PreLoader/>
      ) : artists.length === 0 ? (
        <p className="text-center">No artists :(</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {artists.map((artist) => (
            <div key={artist._id} className="mb-5">
              <Link to={`/albums/${artist._id}`} className="text-decoration-none">
                <ArtistItem name={artist.name} photo={artist.photo} _id={artist._id} />
              </Link>
              <button className="btn btn-outline-danger" onClick={() => onDelete(artist._id)}>
                delete artist
              </button>
            </div>
          ))}
        </div>
      )}
    </>

  );
};

export default Artists;