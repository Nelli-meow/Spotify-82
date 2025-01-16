import MainPage from "./containers/MainPage.tsx";
import {Route, Routes} from "react-router-dom";
import Albums from './features/albums/Albums.tsx';

const App = () => {

  return (
    <>
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/albums/:id" element={<Albums/>} />
            <Route path="*" element={<p>Page is not  found</p>} />
        </Routes>
    </>
  )
};

export default App
