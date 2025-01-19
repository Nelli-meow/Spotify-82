import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg bg-info text-dark mb-5">
      <div className="container p-3 d-flex justify-content-between">
        <Link to="/" className="h3 text-decoration-none">Spotify</Link>
        <Link to="/register" className="h3 text-decoration-none">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;