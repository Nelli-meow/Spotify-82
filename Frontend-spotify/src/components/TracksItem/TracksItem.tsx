import * as React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { addTrackToHistory } from '../../features/trackHistory/TracksHistoryThunks.ts';

interface TracksProps {
  name: string;
  duration: string;
  number: string;
  _id: string;
}

const TracksItem: React.FC<TracksProps> = ({name, number, duration, _id}) => {
  const dispatch = useAppDispatch();

  const handlePlay = () => {
    dispatch(addTrackToHistory(_id));
  };

  return (
    <>
      <div className="col mb-5">
        <div className="card ">
          <div className="card-body d-flex justify-content-between">
            <h3 className="card-title">{name}</h3>
            <span className="card-text">{duration}</span>
            <div>
              <span className="card-text fs-5">{number}</span>
            </div>
            <div>
              <Button onClick={handlePlay}>
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TracksItem;