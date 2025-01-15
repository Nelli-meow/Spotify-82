import MainPage from "./containers/MainPage.tsx";
import {Route, Routes} from "react-router-dom";

const App = () => {

  return (
    <>
        <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="*" element={<p>Page is not  found</p>} />
        </Routes>
    </>
  )
};

export default App
