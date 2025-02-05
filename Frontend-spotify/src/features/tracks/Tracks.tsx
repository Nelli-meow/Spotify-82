import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteTrack, fetchTracksByIdThunk } from './tracksThunk.ts';
import TracksItem from '../../components/TracksItem/TracksItem.tsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectIsLoading, selectTracks } from './tracksSlice.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import { fetchAlbumsThunk } from '../albums/albumsThunk.ts';


const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectIsLoading);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if(id) {
      dispatch(fetchTracksByIdThunk(id));
      dispatch(fetchAlbumsThunk());
    }
  },[dispatch, id]);

  const onDelete = (id: string) => {
    dispatch(deleteTrack(id));
  };

  return (
    <>
      <h3 className="text-center">Tracks</h3>
      <div className="container">
        {isLoading ? (
          <PreLoader />
        ) : tracks.length === 0 ? (
          <p className="text-center">No tracks :(</p>
        ) : (
          <div className="row">
            {tracks.map((track) => (
              <div key={track._id}>
                <TracksItem name={track.name} duration={track.duration} number={track.number} _id={track._id} onDelete={onDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tracks;