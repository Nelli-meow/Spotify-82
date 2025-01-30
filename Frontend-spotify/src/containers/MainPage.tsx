import Artists from '../features/artists/Artists.tsx';
import { useEffect } from 'react';
import { fetchAlbumsThunk } from '../features/albums/albumsThunk.ts';
import { useAppDispatch } from '../app/hooks.ts';

const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
     dispatch(fetchAlbumsThunk());
  },[dispatch]);

  return (
    <>
      <div className="container">
           <Artists/>
      </div>
    </>
  );
};

export default MainPage;