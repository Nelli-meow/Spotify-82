import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAlbums, selectArtist } from './albumsSlice.ts';
import { useEffect } from 'react';
import AlbumItem from '../../components/AlbumItem/AlbumsItem.tsx';
import { deleteAlbum, fetchAlbumsByIdThunk } from './albumsThunk.ts';
import { Link, useParams } from 'react-router-dom';
import { selectIsLoading } from '../tracks/tracksSlice.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';


const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artist = useAppSelector(selectArtist);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumsByIdThunk(id));
    }
  }, [dispatch, id]);

  const onDelete = (id: string) => {
    dispatch(deleteAlbum(id));
  };


  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h3 className="text-center">Albums</h3>
        </div>
        {artist && <h4 className="text-center">Artist - {artist}</h4>}
        {isLoading ? (
          <PreLoader/>
        ) : albums.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {albums.map((album) => (
              <div key={album._id}>
                <Link to={`/tracks/${album._id}`} className="text-decoration-none">
                  <AlbumItem
                    name={album.name}
                    year={album.year}
                    num={album.number}
                    photo={album.image}
                  />
                </Link>
                <button className="btn btn-outline-danger" onClick={() => onDelete(album._id)}>
                  delete album
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No albums here :(</p>
        )}
      </div>
    </>

  );
};

export default Albums;