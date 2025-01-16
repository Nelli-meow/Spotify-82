import Artists from '../features/artists/Artists.tsx';
import Header from '../components/Header/Header.tsx';

const MainPage = () => {

  return (
    <>
      <Header/>
      <div className="container">
        <Artists/>
      </div>
    </>
  );
};

export default MainPage;