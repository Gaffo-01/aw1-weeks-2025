import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Question, Answer } from "./models/QAModels.mjs";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm";
import { Routes, Route } from "react-router";
import DefaultLayout from "./components/DefaultLayout";
import Questions from "./components/Questions";
import PageNotFound from "./components/PageNotFound";

const fakeQuestion = new Question(
  1,
  "Is JavaScript better than Python?",
  "luigi.derussis@polito.it",
  1,
  "2025-02-28"
);
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [questions, setQuestions] = useState([fakeQuestion]);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answerId)
          return new Answer(
            ans.id,
            ans.text,
            ans.email,
            ans.userId,
            ans.date,
            ans.score + 1
          );
        else return ans;
      });
    });
  };

  const addAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      // temporaneo
      const newId = Math.max(...oldAnswers.map((ans) => ans.id)) + 1;
      const newAnswer = new Answer(
        newId,
        answer.text,
        answer.email,
        undefined,
        answer.date
      );
      return [...oldAnswers, newAnswer];
    });
  };

  const updateAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answer.id)
          return new Answer(
            answer.id,
            answer.text,
            answer.email,
            ans.userId,
            answer.date,
            ans.score
          );
        else return ans;
      });
    });
  };

  const deleteAnswer = (answerId) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.filter((answer) => answer.id !== answerId);
    });
  };

  {
    /* ROUTES
    
    - / => tutte le domande (index)
    - /questions/:qid => domanda "id" con le sue risposte

    OPZIONE 1:
    - /questions/:qid/answers/new => nuova risposta
    - /questions/:qid/answers/:aid/edit => modifica risposta

    OPZIONE 2:
    - /answers/:aid/edit => modifica risposta

    - * => pagina not found

    */
  }

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {/* quando metto il path="/" è il path di default per quando si accede
        viene messo al posto di index*/}
        <Route path="/" element={<Questions questions={questions} />} />
        <Route
        // quando cerchiamo un id specifico, controllare nel componente QeustionDescription 
        // se l'id è presente, altrimenti si indirizza in un'altra pagina per l'errore
          path="/questions/:questionId"
          element={<QuestionDescription questions={questions} />}
        >
          {/*usando index serve per far si che quando accedo alla route padre
           "/questions/:questionId", la route figlia con index viene caricata
           automaticamente, inveve per le altre serve il path specifico*/}
           {/*quando effettuo una route padre, le rispettive route figlie
           avranno il path del padre concatenato al path del figlio*/}
          <Route
            index
            element={
              <Answers
                answers={answers}
                voteUp={voteUp}
                addAnswer={addAnswer}
                editAnswer={updateAnswer}
                deleteAnswer={deleteAnswer}
              />
            }
          />
          <Route
            path="answers/new"
            element={<AnswerForm addAnswer={addAnswer} />}
          />
          <Route
            path="answers/:answerId/edit"
            element={
              <EditAnswerForm editAnswer={updateAnswer} answers={answers} />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Route>
    </Routes>
  );
}

export default App;
