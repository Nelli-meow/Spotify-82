import * as React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addTrackToHistory } from '../../features/trackHistory/TracksHistoryThunks.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';

interface TracksProps {
  name: string;
  duration: string;
  number: number;
  _id: string;
  onDelete: (id: string) => void;
}

const TracksItem: React.FC<TracksProps> = ({name, number, duration, _id, onDelete}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

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
              {user && user.role === 'admin' && (
                <>
                  <Button onClick={() => onDelete(_id)} className="text-danger-emphasis ms-2">delete track</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TracksItem;