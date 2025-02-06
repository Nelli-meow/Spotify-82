import { useAppDispatch } from '../../app/hooks.ts';
import { fetchArtistsThunk } from '../../features/artists/artistsThunk.ts';
import { useEffect } from 'react';
import { fetchAlbumsThunk } from '../../features/albums/albumsThunk.ts';
import { Link } from 'react-router-dom';
import { fetchTracksThunk } from '../../features/tracks/tracksThunk.ts';

const AdminPage = () => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchArtistsThunk());
    dispatch(fetchAlbumsThunk());
    dispatch(fetchTracksThunk());
  }, [dispatch]);


  return (
    <div className="container">
      <h3 className="text-bg-primary text-center rounded-5 my-5 p-3">Unpublished items</h3>
      <div className="d-flex flex-row align-items-center justify-content-sm-around">
        <>
          <Link className="btn btn-outline-warning p-5 fs-3" to="/unpublished-artists">Artists</Link>
          <Link className="btn btn-outline-info p-5 fs-3" to="/unpublished-albums">Albums</Link>
          <Link className="btn btn-outline-primary p-5 fs-3" to="/unpublished-tracks">Tracks</Link>
        </>
      </div>
    </div>
  );
};

export default AdminPage;