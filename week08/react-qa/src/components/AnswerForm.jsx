import { useActionState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import dayjs from "dayjs";
import { Link } from "react-router";
import { useNavigate, useParams } from "react-router";

export function EditAnswerForm(props) {
  // 1. metodo con useParams
  const params = useParams();
  const answerId = params.answerId;

  const answer = props.answers.filter((ans) => ans.id == answerId)[0];

  return <AnswerForm answer={answer} editAnswer={props.editAnswer} />;
}

export function AnswerForm(props) {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const initialState = {
    text: props.answer?.text,
    email: props.answer?.email,
    date:
      props.answer?.date.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD"),
  };

  const handleSubmit = async (prevState, formData) => {
    // creo un oggetto {} dal FormData
    const answer = Object.fromEntries(formData.entries());

    // esempio di validazione
    if (answer.text.trim() === "") {
      answer.error = "The answer can't be empty, please fix it!";
      return answer;
    }

    if (props.addAnswer)
      // aggiungo la risposta allo stato in App
      props.addAnswer(answer);
    else props.editAnswer({ id: props.answer.id, ...answer });

    // quando effettuo un submit, voglio tornare alla pagina della domanda
    navigate(`/questions/${questionId}`);
  };

  const [state, formAction] = useActionState(handleSubmit, initialState);

  return (
    <>
      {state.error && <Alert variant="secondary">{state.error}</Alert>}

      <Form action={formAction}>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control
            name="text"
            type="text"
            required={true}
            minLength={2}
            defaultValue={state.text}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            required={true}
            defaultValue={state.email}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            type="date"
            required={true}
            min={dayjs().format("YYYY-MM-DD")}
            defaultValue={state.date}
          ></Form.Control>
        </Form.Group>
        {props.addAnswer && (
          <Button variant="primary" type="submit">
            Add
          </Button>
        )}
        {props.editAnswer && (
          <Button variant="success" type="submit">
            Update
          </Button>
        )}{" "}
        <Link className="btn btn-danger" to={`/questions/${questionId}`}>
          Cancel
        </Link>
      </Form>
    </>
  );
}
