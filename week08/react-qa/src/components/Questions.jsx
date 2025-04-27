import { Row, Col } from "react-bootstrap";
import { Link } from "react-router";

function Questions(props) {
  return (
    <Row>
      <Col>
        <h1>Welcome to HeapOverrun!</h1>
        <p className="lead">We have {props.questions.length} questions...</p>
      </Col>
      <Row>
        {props.questions.map((q) => (
          <Col key={q.id}>
            <Link to={`/questions/${q.id}`} className="btn btn-primary">{q.text}</Link>
          </Col>
        ))}
      </Row>
    </Row>
  );
}

export default Questions;
