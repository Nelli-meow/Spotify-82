import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchArtistsThunk } from './artistsThunk.ts';
import { selectArtists } from './artistsSlice.ts';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import { Link } from 'react-router-dom';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtistsThunk());
  }, []);

  return (
    <>
      <h3 className="text-center">Artists</h3>
      {artists.length === 0 ? (
        <p className="text-center">No artists :(</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {artists.map((artist) => (
            <div key={artist._id}>
              <Link to={`/albums/${artist._id}`} className="text-decoration-none">
                <ArtistItem name={artist.name} photo={artist.photo} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Artists;