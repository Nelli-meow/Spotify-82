import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectTracksHistory } from './TrackHistorySlice.ts';
import TracksHistoryItem from '../../components/TracksHistoryItem/TracksHistoryItem.tsx';
import { useEffect } from 'react';
import { fetchTracksHistory } from './TracksHistoryThunks.ts';

const TrackHistory = () => {
  const tracksHistory = useAppSelector(selectTracksHistory);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  console.log(tracksHistory);

  useEffect(() => {
    if (token) {
      dispatch(fetchTracksHistory(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <div className="container">
        <h2 className="text-center">Tracks history</h2>
        {tracksHistory.length > 0 ? (
          <>
            {tracksHistory.map((track) => (
              <TracksHistoryItem
                key={track._id}
                datetime={track.datetime}
                artist={track.trackId.name}
                name={track.trackId.name}
                duration={track.trackId.duration}
              />
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
