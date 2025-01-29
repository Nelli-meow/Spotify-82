import MainPage from "./containers/MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import Albums from './features/albums/Albums.tsx';
import Tracks from './features/tracks/Tracks.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import TracksHistory from './features/trackHistory/TracksHistory.tsx';
import Header from './components/Header/Header.tsx';

const App = () => {

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
          <Route path="*" element={<p>Page is not  found</p>} />
        </Routes>
    </>
  )
};

export default App
