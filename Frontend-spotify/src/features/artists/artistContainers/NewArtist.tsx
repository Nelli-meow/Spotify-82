import ArtistFormPage from '../../../containers/ArtistFormPage/ArtistFormPage.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/UsersSlice.ts';
import { IArtistsMutation } from '../../../types';
import { addNewArtist, fetchArtistsThunk } from '../artistsThunk.ts';
import { useNavigate } from 'react-router-dom';

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmit = async (artist: IArtistsMutation) => {
    if (user) {
      await dispatch(addNewArtist({ artist, token: user.token }));
      await dispatch(fetchArtistsThunk());
      navigate('/');
    }
  };

  return (
    <>
      <ArtistFormPage onSubmit={onSubmit}/>
    </>
  );
};

export default NewArtist;