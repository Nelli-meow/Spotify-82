import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTracksByIdThunk } from './tracksThunk.ts';
import TracksItem from '../../components/TracksItem/TracksItem.tsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectTracks } from './tracksSlice.ts';
import Header from '../../components/Header/Header.tsx';


const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if(id) {
      dispatch(fetchTracksByIdThunk(id));
    }
  },[dispatch]);


  return (
    <>
      <Header />
      <h3 className="text-center">Tracks</h3>
      <div className="container">
        {tracks.length === 0 ? (
          <p className="text-center">No tracks :(</p>
        ) : (
          <div className="row">
            {tracks.map((track) => (
              <div key={track._id}>
                <TracksItem name={track.name} duration={track.duration} number={track.number} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tracks;