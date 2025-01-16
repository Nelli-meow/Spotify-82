import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg bg-info text-dark mb-5">
      <div className="container p-3">
        <Link to="/" className="h3 text-decoration-none">Spotify</Link>
      </div>
    </header>
  );
};

export default Header;