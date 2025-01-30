import MainPage from './containers/MainPage.tsx';
import {Route, Routes} from 'react-router-dom';
import Albums from './features/albums/Albums.tsx';
import Tracks from './features/tracks/Tracks.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import TracksHistory from './features/trackHistory/TracksHistory.tsx';
import Header from './components/Header/Header.tsx';
import NewArtist from './features/artists/artistContainers/NewArtist.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/users/UsersSlice.ts';
import NewAlbum from './features/albums/albumContainers/NewAlbum.tsx';
import NewTrack from './features/tracks/trackContainers/NewTrack.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/albums/:id" element={<Albums/>} />
          <Route path="/tracks/:id" element={<Tracks/>} />
          <Route path="/tracks-history" element={<TracksHistory />} />
          <Route path="/artists/new" element={
            <ProtectedRoute isaAllowed={!!user}>
              <NewArtist/>
            </ProtectedRoute>
          } />
          <Route path="/albums/new" element={
            <ProtectedRoute isaAllowed={!!user}>
              <NewAlbum/>
            </ProtectedRoute>
          } />
          <Route path="/tracks/new" element={
            <ProtectedRoute isaAllowed={!!user}>
              <NewTrack/>
            </ProtectedRoute>
          } />
          <Route path="*" element={<p className="text-center">Page is not  found</p>} />
        </Routes>
    </>
  );
};

export default App;
