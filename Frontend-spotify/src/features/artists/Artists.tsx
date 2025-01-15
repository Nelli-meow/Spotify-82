import { useAppDispatch } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchArtistsThunk } from './artistsThunk.ts';

const Artists = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArtistsThunk());
  },[])

  return (
    <div>
      artists
    </div>
  );
};

export default Artists;