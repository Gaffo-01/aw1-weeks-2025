import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from "./AnswerForm";

function Answers (props) {
  return(
    <>
    <Row>
      <Col as="h2">Answers:</Col>
    </Row>
    <Row>
      <Col lg={10} className="mx-auto">
        <AnswerTable answers={props.answers} voteUp={props.voteUp} />
        <AnswerForm addAnswer={props.addAnswer}/>
      </Col>
    </Row>
    </>
  );
}

function AnswerTable (props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { props.answers.map((ans) => <AnswerRow key={ans.id} answer={ans} voteUp={props.voteUp} />) }
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return(
    <tr><AnswerData answer={props.answer} /><AnswerAction voteUp={props.voteUp} answerId={props.answer.id} /></tr>
  );
}

function AnswerData(props) {
  return(
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return(
    <td>
      <Button variant="warning" onClick={() => {props.voteUp(props.answerId)}}><i className="bi bi-arrow-up" /></Button>
      <Button variant="primary" className="mx-1"><i className="bi bi-pencil-square" /></Button> 
      <Button variant="danger"><i className="bi bi-trash" /></Button>
    </td>
  );
}

export default Answers;