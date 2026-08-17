import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "1rem",
        borderBottom: "1px solid #eee",
        marginBottom: "1.5rem"
      }}
    >
      <Link to="/">Learning Modules</Link>
      <Link to="/knowledge-hub">Knowledge Hub</Link>
    </nav>
  );
}

export default Navbar;