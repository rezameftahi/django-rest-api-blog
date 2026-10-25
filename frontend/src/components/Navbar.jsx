
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          Blog<span>.</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Articles</Link>
          <Link to="/articles/create">Create Article</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
