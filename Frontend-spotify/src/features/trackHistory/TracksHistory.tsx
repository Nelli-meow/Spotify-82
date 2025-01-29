import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTracksHistory } from './TrackHistorySlice.ts';
import TracksHistoryItem from '../../components/TracksHistoryItem/TracksHistoryItem.tsx';
import { useEffect } from 'react';
import { addTrackToHistory } from './TracksHistoryThunks.ts';

const TrackHistory = () => {
  const tracksHistory = useAppSelector(selectTracksHistory);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');


  useEffect(() => {
    if(token) {
      dispatch(addTrackToHistory(token));
    }
  },[dispatch, token]);

  return (
    <>
      <div className="container">
        <h2 className="text-center">Tracks history</h2>
        {tracksHistory.length > 0 ? (
          <>
            {tracksHistory.map((track) => (
            <TracksHistoryItem key={track._id} datetime={track.datetime} artist={track.artist} name={track.name} duration={track.duration} />
            ))}
          </>
        ) : (
          <p>No tracks found.</p>
        )}
      </div>
    </>
  );
};

export default TrackHistory;
