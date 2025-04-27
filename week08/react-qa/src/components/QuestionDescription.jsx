import { Col, Row } from "react-bootstrap";
import { Outlet, useParams } from "react-router";
import { Link } from "react-router";
import { Container } from "react-bootstrap";

function QuestionDescription(props) {
  /*passando un solo parametro lo posso prendere direttamente */
  const { questionId } = useParams();
  const question = props.questions[questionId - 1];

  return (
    <>
      {question ? (
        <>
          <Row>
            <Col md={6} as="p">
              <strong>Question #{question.id}:</strong>
            </Col>
            <Col md={6} as="p" className="text-end">
              Asked by{" "}
              <span className="badge rounded-pill text-bg-secondary">
                {question.email}
              </span>
            </Col>
          </Row>
          <Row>
            <Col as="p" className="lead">
              {question.text}
            </Col>
          </Row>
          <Outlet />
        </>
      ) : (
        <QuestionDescriptionNotFound questionId={questionId} />
      )}
    </>
  );
}

/*nel caso di id errato */
function QuestionDescriptionNotFound(props) {
  const { questionId } = useParams();
  return (
    <Container fluid>
      <Row>
        <Col align="center" className="mt-5">
          <h1>Errore: QuestionId non presente</h1>
          <p>L'id {questionId} della domanda non è presente</p>
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

export default QuestionDescription;
