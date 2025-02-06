import PreLoader from '../../../components/UI/PreLoader.tsx';
import TracksItem from '../../../components/TracksItem/TracksItem.tsx';
import { fetchTracksThunk, publishTracks } from '../../../features/tracks/tracksThunk.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectTracks } from '../../../features/tracks/tracksSlice.ts';
import { selectIsLoading } from '../../../features/artists/artistsSlice.ts';
import { Link } from 'react-router-dom';


const UnpublishedTracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectIsLoading);

  const handlePublishTrack =  async (id: string) => {
    await dispatch(publishTracks(id));
    dispatch(fetchTracksThunk());
  };

  return (
    <div className="container">
      <div className="col">
        <div className="d-flex align-items-center flex-column">
          <Link to='/unpublished' className="btn btn-outline-primary">back...</Link>
          <h3 className="text-center my-4">Unpublished Tracks</h3>
        </div>
        {isLoading ? (
          <PreLoader/>
        ) : tracks.length === 0 ? (
          <p className="text-center">No unpublished Tracks :(</p>
        ) : (
          <div className="row">
            {tracks
              .filter((track) => !track.isPublished)
              .map((track) => (
                <div key={track._id} className="mb-5">
                  <TracksItem name={track.name} number={track.number} _id={track._id} duration={track.duration}
                              onDelete={() => (track._id)}/>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => handlePublishTrack(track._id)}
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

export default UnpublishedTracks;