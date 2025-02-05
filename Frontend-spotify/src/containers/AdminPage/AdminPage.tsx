import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectArtists, selectIsLoading } from '../../features/artists/artistsSlice.ts';
import { fetchArtistsThunk, publishArtist } from '../../features/artists/artistsThunk.ts';
import { useEffect } from 'react';
import ArtistItem from '../../components/ArtistItem/ArtistItem.tsx';
import PreLoader from '../../components/UI/PreLoader.tsx';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchArtistsThunk());
  }, [dispatch]);


  const onPublish = async (id: string) => {
    await dispatch(publishArtist(id));

    dispatch(fetchArtistsThunk());
  };


  return (
    <div className="container">
      <h3 className="text-center my-4">Unpublished Artists</h3>
      {isLoading ? (
        <PreLoader/>
      ) : artists.length === 0 ? (
        <p className="text-center">No unpublished artists :(</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {artists
            .filter((artist) => !artist.isPublished)
            .map((artist) => (
              <div key={artist._id} className="mb-5">
                <ArtistItem name={artist.name} photo={artist.photo} _id={artist._id} />
                <button
                  className="btn btn-outline-success"
                  onClick={() => onPublish(artist._id)}
                >
                  Publish
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;