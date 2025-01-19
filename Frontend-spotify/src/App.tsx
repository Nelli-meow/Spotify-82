import MainPage from "./containers/MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import Albums from './features/albums/Albums.tsx';
import Tracks from './features/tracks/Tracks.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';

const App = () => {

  return (
    <>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/albums/:id" element={<Albums/>} />
          <Route path="/tracks/:id" element={<Tracks/>} />
          <Route path="*" element={<p>Page is not  found</p>} />
        </Routes>
    </>
  )
};

export default App
