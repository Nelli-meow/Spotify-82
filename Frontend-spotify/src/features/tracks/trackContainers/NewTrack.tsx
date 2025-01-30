import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/UsersSlice.ts';
import {  ITrackMutation } from '../../../types';
import TrackFormPage from '../../../containers/TrackFormPage/TrackFormPage.tsx';
import { addNewTrack } from '../tracksThunk.ts';


const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmit = async (track: ITrackMutation) => {
    if (user) {
      await dispatch(addNewTrack({track, token: user.token}));
      navigate('/');
    }
  };

  return (
    <>
      <TrackFormPage onSubmit={onSubmit}/>
    </>
  );
};

export default NewTrack;