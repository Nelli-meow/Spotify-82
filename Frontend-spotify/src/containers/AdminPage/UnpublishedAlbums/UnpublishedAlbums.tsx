import PreLoader from '../../../components/UI/PreLoader.tsx';
import AlbumItem from '../../../components/AlbumItem/AlbumsItem.tsx';
import { fetchAlbumsThunk, publishAlbums } from '../../../features/albums/albumsThunk.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectAlbums } from '../../../features/albums/albumsSlice.ts';
import { selectIsLoading } from '../../../features/artists/artistsSlice.ts';
import { Link } from 'react-router-dom';


const UnpublishedAlbums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isLoading = useAppSelector(selectIsLoading);

  const onPublishAlbum = async (id: string) => {
    await dispatch(publishAlbums(id));
    dispatch(fetchAlbumsThunk());
  };


  return (
    <div className="container">
      <div className="col">
        <div className="d-flex align-items-center flex-column">
          <Link to='/unpublished' className="btn btn-outline-primary">back...</Link>
          <h3 className="text-center my-4">Unpublished Albums</h3>
        </div>
        {isLoading ? (
          <PreLoader/>
        ) : albums.length === 0 ? (
          <p className="text-center">No unpublished Albums :(</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {albums
              .filter((album) => !album.isPublished)
              .map((album) => (
                <div key={album._id} className="mb-5">
                  <AlbumItem name={album.name} photo={album.image} year={album.year}/>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => onPublishAlbum(album._id)}
                  >
                    Publish
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnpublishedAlbums;