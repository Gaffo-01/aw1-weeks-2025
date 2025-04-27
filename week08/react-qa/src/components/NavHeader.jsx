import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavHeader(props) {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/"
            className="text-decoration-none text-white fw-bold"
            style={{ transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            HeapOverrun
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
