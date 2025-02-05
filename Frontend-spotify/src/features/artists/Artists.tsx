import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { deleteArtist, fetchArtistsThunk } from './artistsThunk.ts';
import { selectArtists, selectIsLoading } from './artistsSlice.ts';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import { Link } from 'react-router-dom';
import PreLoader from '../../components/UI/PreLoader.tsx';
import { selectUser } from '../users/UsersSlice.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  console.log(artists);

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
        <PreLoader />
      ) : artists.length === 0 ? (
        <p className="text-center">No artists :(</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {artists
            .filter(artist => user?.role === 'admin' || artist.isPublished)
            .map((artist) => (
              <div key={artist._id} className="mb-5">
                <Link to={`/albums/${artist._id}`} className="text-decoration-none">
                  <ArtistItem name={artist.name} photo={artist.photo} _id={artist._id} />
                </Link>
                {user && user.role === 'admin' && (
                  <>
                    <span>{artist.isPublished ? 'Published' : 'Not Published'}</span>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDelete(artist._id)}
                    >
                      Delete artist
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Artists;