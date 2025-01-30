import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../users/UsersSlice.ts';
import { IAlbumsMutation } from '../../../types';
import AlbumFormPage from '../../../containers/AlbumFormPage/AlbumFormPage.tsx';
import { addNewAlbum } from '../albumsThunk.ts';


const NewAlbum = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmit = async (album: IAlbumsMutation) => {
    if (user) {
      await dispatch(addNewAlbum({ album, token: user.token}));
      // navigate('/');
    }
  };

  return (
    <>
      <AlbumFormPage onSubmit={onSubmit}/>
    </>
  );
};

export default NewAlbum;