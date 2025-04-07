import { useActionState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import dayjs from "dayjs";

function AnswerForm(props) {
  
  const initialState = {
    text: "",
    email: "",
    date: dayjs().format("YYYY-MM-DD")
  };
  
  const handleSubmit = async (prevState, formData) => {
    // creo un oggetto {} dal FormData
    const answer = Object.fromEntries(formData.entries());

    // esempio di validazione
    if(answer.text.trim() === "") {
      answer.error = "The answer can't be empty, please fix it!";
      return answer;
    }

    // aggiungo la risposta allo stato in App
    props.addAnswer(answer);

    // ritorno lo stato del form
    return initialState;
  }

  const [state, formAction] = useActionState(handleSubmit, initialState);

  return(
    <>
      { state.error && <Alert variant="secondary">{state.error}</Alert> }
      <Form action={formAction}>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control name="text" type="text" required={true} minLength={2} defaultValue={state.text}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>email</Form.Label>
          <Form.Control name="email" type="email" required={true} defaultValue={state.email}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="date" required={true} min={dayjs().format("YYYY-MM-DD")}defaultValue={state.date}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Add</Button> <Button variant="danger">Cancel</Button>
      </Form>
    </>
  );
}

export default AnswerForm;