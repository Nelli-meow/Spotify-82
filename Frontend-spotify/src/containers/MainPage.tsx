import Artists from '../features/artists/Artists.tsx';
import Header from '../components/Header/Header.tsx';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/UsersSlice.ts';

const MainPage = () => {
  const user = useAppSelector(selectUser);


  return (
    <>
      <Header/>
      <div className="container">
        {
          user ? <Artists/> :<p className="text-center my-5">Login or create an account :)</p>
        }
      </div>
    </>
  );
};

export default MainPage;