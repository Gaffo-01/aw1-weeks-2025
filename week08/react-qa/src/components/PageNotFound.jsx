import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function PageNotFound() {
  return (
    <Container fluid>
      <Row>
        <Col align="center" className="mt-5">
          <h1>404</h1>
          <p>Oops! La pagina che stai cercando non esiste.</p>
        </Col>
      </Row>
      <Row>
        <Col align="center" className="mt-3">
          <Link to="/" className="btn btn-primary">
            Torna alla HomePage
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
