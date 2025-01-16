import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectAlbums, selectArtist } from './albumsSlice.ts';
import { useEffect } from 'react';
import AlbumItem from '../../components/AlbumItem/AlbumsItem.tsx';
import Header from '../../components/Header/Header.tsx';
import { fetchAlbumsByIdThunk } from './albumsThunk.ts';
import { Link, useParams } from 'react-router-dom';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const artist = useAppSelector(selectArtist);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumsByIdThunk(id));
    }
  }, [dispatch, id]);


  return (
    <>
      <Header />
      <div className="container">
        <h3 className="text-center">Albums</h3>
        {artist && <h4 className="text-center">Artist - {artist}</h4>}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {albums.length > 0 ? (
            albums.map((album) => (
              <Link to={`/tracks/${album._id}`} className="text-decoration-none">
                <AlbumItem
                  key={album._id}
                  name={album.name}
                  year={album.year}
                  num={album.number}
                  photo={album.photo}
                />
              </Link>
            ))
          ) : (
            <p className="text-center">No albums here :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Albums;