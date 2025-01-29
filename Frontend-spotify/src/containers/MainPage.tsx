import Artists from '../features/artists/Artists.tsx';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/UsersSlice.ts';

const MainPage = () => {
  const user = useAppSelector(selectUser);


  return (
    <>
      <div className="container">
        {
          user ? <Artists/> :<p className="text-center my-5">Login or create an account :)</p>
        }
      </div>
    </>
  );
};

export default MainPage;