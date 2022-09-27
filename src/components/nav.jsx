import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav id="nav">
      <Link to="/">Home</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default Nav;
