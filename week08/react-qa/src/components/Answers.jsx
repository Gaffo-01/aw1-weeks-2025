import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router";

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable
            answers={props.answers}
            voteUp={props.voteUp}
            deleteAnswer={props.deleteAnswer}
          />

          <Link className="btn btn-primary" to="answers/new">
            Add
          </Link>
        </Col>
      </Row>
    </>
  );
}

function AnswerTable(props) {

  // Stato per l'array ordinato
  const [sortedAnswers, setSortedAnswers] = useState([...props.answers]);

  //tipologia di stato per ordinamento
  const [sortOrderScore, setSortOrderScore] = useState("asc");
  const [sortOrderDate, setSortOrderDate] = useState("asc");
  const [activeSort, setActiveSort] = useState("score");

  // if (activeSort === "score") {
  //   if (sortOrderScore === "asc")
  //     sortedAnswers.sort((a, b) => a.score - b.score);
  //   else if (sortOrderScore === "desc")
  //     sortedAnswers.sort((a, b) => b.score - a.score);
  // } else if (activeSort === "date") {
  //   if (sortOrderDate === "asc") sortedAnswers.sort((a, b) => a.date - b.date);
  //   else if (sortOrderDate === "desc")
  //     sortedAnswers.sort((a, b) => b.date - a.date);
  // }

  const sortByScore = () => {
    setActiveSort("score");
    setSortOrderScore((prev) => (prev === "asc" ? "desc" : "asc"));

    const sorted = [...sortedAnswers].sort((a, b) =>
      sortOrderScore === "asc" ? b.score - a.score : a.score - b.score
    );
    setSortedAnswers(sorted);
  };

  const sortByDate = () => {
    setActiveSort("date");
    setSortOrderDate((prev) => (prev === "asc" ? "desc" : "asc"));

    const sorted = [...sortedAnswers].sort((a, b) =>
      sortOrderDate === "asc" ? b.date - a.date : a.date - b.date
    );
    setSortedAnswers(sorted);
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th>
            <Button
              variant="link"
              className={`text-black ${
                activeSort === "date" ? "border border-dark rounded" : ""
              }`}
              onClick={sortByDate}
            >
              <i
                className={
                  sortOrderDate === "asc" ? "bi bi-sort-up" : "bi bi-sort-down"
                }
              ></i>
            </Button>{" "}
            Date
          </th>
          <th>Text</th>
          <th>Author</th>
          <th>
            Score{" "}
            {/* variant="link" -> trasforma un pulsante in un elemento che appare come un link
            className ="text-black" rende il testo nero quindi nasconte il colore del link azzurro */}
            <Button
              variant="link"
              className={`text-black ${
                activeSort === "score" ? "border border-dark rounded" : ""
              }`}
              onClick={sortByScore}
            >
              <i
                className={
                  sortOrderScore === "asc"
                    ? "bi bi-sort-numeric-up"
                    : "bi bi-sort-numeric-down"
                }
              ></i>
            </Button>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedAnswers.map((ans) => (
          <AnswerRow
            key={ans.id}
            answer={ans}
            voteUp={props.voteUp}
            deleteAnswer={props.deleteAnswer}
          />
        ))}
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return (
    <tr>
      <AnswerData answer={props.answer} />
      <AnswerAction {...props} />
    </tr>
  );
}

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return (
    <td>
      <Button variant="warning" onClick={() => props.voteUp(props.answer.id)}>
        <i className="bi bi-arrow-up" />
      </Button>
      <Link
        className="mx-1 btn btn-primary"
        to={`answers/${props.answer.id}/edit`}
      >
        <i className="bi bi-pencil-square" />
      </Link>
      <Button variant="danger">
        <i
          className="bi bi-trash"
          onClick={() => props.deleteAnswer(props.answer.id)}
        />
      </Button>
    </td>
  );
}

export default Answers;
