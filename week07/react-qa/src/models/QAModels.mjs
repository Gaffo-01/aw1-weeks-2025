import dayjs from "dayjs";

function Answer(id, text, email, userId, date, score=0) {
  this.id = id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.score = score;
  this.date = dayjs(date);
}

function Question(id, text, email, userId, date) {
  this.id =id;
  this.text = text;
  this.email = email;
  this.userId = userId;
  this.date = dayjs(date);
  this.answers = [];

  this.getAnswers = () => {
    return [...this.answers];
  }

  this.init = () => {
    this.answers = [
      new Answer(1, "Yes", "stefano.zeta@email.it", 2, "2025-02-28", -10),
      new Answer(2, "Not in a million year", "guido.vanrossum@python.org", 3, "2025-03-01", 5),
      new Answer(3, "Both have their pros and cons", "alessio.gi@email.it", 4, "2025-03-02"),
      new Answer(4, "andre ciao ", "alessio.gi@email.it", 4, "2025-03-02")
    ];
  }
}

export { Question, Answer };