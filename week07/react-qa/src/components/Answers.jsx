import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useState } from "react";

function Answers(props) {
  /*gestire il pulsante per la visione del form (stato ternario)
  - view
  - add
  - edit*/
  const [mode, setMode] = useState("view");

  /*noi vogliamo lo stato che ci mantenga la risposta da modificare
  questo perchè la tabella e il form non sono uno dentro l'altro
  => non possiamo passare le props perchè non è un figlio
  
  ci serve lo stato in answers perchè è il padre comune di questi elementi
  (form e tabella)*/

  /*inizialmente passo come risposta da editare una riposta undefined
  quando effetto la set in editableAnswer inserisco la risposta che voglio modificare*/

  const [editableAnswer, setEditableAnswer] = useState();

  const handleEdit = (answer) => {
    setEditableAnswer(answer);
    setMode("edit");
  };

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
            handleEdit={handleEdit}
            deleteAnswer={props.deleteAnswer}
            voteDown={props.voteDown}
          />

          {mode === "view" && (
            <Button variant="primary" onClick={() => setMode("add")}>
              Add
            </Button>
          )}

          {mode === "add" && (
            <AnswerForm
              addAnswer={(answer) => {
                /*aggiunge la risposta alla tabella */
                props.addAnswer(answer);
                /*cambia il tipo di visualizzazione */
                setMode("view");
              }}
              /*cancel è una prop -> devo andarla ad inserire dove viene chiamata */
              cancel={() => setMode("view")}
            />
          )}

          {mode === "edit" && (
            <AnswerForm
              /*serve a react per capire che domanda andare ad inserire
              => nel momento in cui cambia l'id della domanda lo rendirizza
              -> caso in cui clicchiamo due volte consecutivamente due bottoni 
              per modifica consecutivamente ma senza cliccare update 
              o cancel per il form  */
              key={editableAnswer.id}
              answer={editableAnswer}
              editAnswer={(answer) => {
                props.editAnswer(answer);
                setMode("view");
              }}
              cancel={() => setMode("view")}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

function AnswerTable(props) {
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
        {props.answers.map((ans) => (
          <AnswerRow
            /*con tabelle, liste, bisogna inserire delle key 
            univoche per l'utilizzo di React*/
            key={ans.id} //sempre quando usiamo .map()
            answer={ans}
            voteUp={props.voteUp}
            handleEdit={props.handleEdit}
            deleteAnswer={props.deleteAnswer}
            voteDown={props.voteDown}
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
      <AnswerAction
        /*avremmo potuto mettere 
        {..props} per passarle tutte senza doverle elencare */
        voteUp={props.voteUp}
        answer={props.answer}
        handleEdit={props.handleEdit}
        deleteAnswer={props.deleteAnswer}
        voteDown={props.voteDown}
      />
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
      <Button
        variant="warning"
        className="me-1"
        onClick={() => {
          props.voteUp(props.answer.id);
        }}
      >
        {/*bi è il nome della libreria bootstrap icon*/}
        {/*bi-arrow-up è il nome dell'icona che vogliamo utilizzare */}
        <i className="bi bi-arrow-up" />
      </Button>
      <Button
        variant="primary"
        className="me-1"
        onClick={() => props.handleEdit(props.answer)}
      >
        {/*bi è il nome della libreria bootstrap icon*/}
        {/*bi-pencil-square è il nome dell'icona che vogliamo utilizzare */}
        <i className="bi bi-pencil-square" />
      </Button>
      <Button
        variant="danger"
        className="me-1"
        onClick={() => props.deleteAnswer(props.answer.id)}
      >
        {/*bi è il nome della libreria bootstrap icon*/}
        {/*bi-trash è il nome dell'icona che vogliamo utilizzare */}
        <i className="bi bi-trash" />
      </Button>
      <Button
        variant="dark"
        onClick={() => {
          props.voteDown(props.answer.id);
        }}
      >
        {/*bi è il nome della libreria bootstrap icon*/}
        {/*bi-arrow-up è il nome dell'icona che vogliamo utilizzare */}
        <i className="bi bi-arrow-down" />
      </Button>
    </td>
  );
}

export default Answers;
