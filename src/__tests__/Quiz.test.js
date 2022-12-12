/*
Quiz test
4. Submit button brings us to learning goals page
2. Submit button submits answers that are currently selected -- shows empty string for unpicked answer
5. Order of answer array is the same as the order of the question array

1. Correct questions are being displayed onto test -- quiz questions array reflects displayed questions
3. Choices can be selected and can only select one
*/

import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../components/Quiz";
//import data from "../../data/Fake_Questions.json";

// Questions from the question bank
const questions = [
  {
    qID: 2,
    learningGoal: 1,
    question: "What is a typical lifespan of a cat?",
    choices: ["12-18 years", "20-22 years", "0-4 years", "6-12 years"],
  },
  {
    qID: 3,
    learningGoal: 1,
    question: "Which is NOT a breed of cat?",
    choices: ["Siamese", "British Shorthair", "Persian", "Poodle"],
  },
  {
    qID: 1,
    learningGoal: 1,
    question: "What is a cat?",
    choices: ["Dog", "Elephant", "Turtle", "Cat"],
  },
  {
    qID: 14,
    learningGoal: 3,
    question: "What apple variant is native to North America?",
    choices: ["Crabapple", "Gala", "Honeycrisp", "Empire"],
  },
  {
    qID: 18,
    learningGoal: 4,
    question: "Which pokemon is the only pokemon that can devolve?",
    choices: ["Raichu", "Slowbro", "Machamp", "Torterra"],
  },
];

//const learningGoals = ["1", "3"]

describe.skip("Quiz", () => {
  const testQuiz = questions.map((question) => ({ ...question }));

  test("Quiz: Answers recorded once after submit button clicked", () => {
    const testLearningGoals = ["1", "3"];
    const submitQuiz = jest.fn();
    render(
      <Quiz
        data={testQuiz}
        learningGoals={testLearningGoals}
        submitQuiz={submitQuiz}
      />
    );
    const q14Choice = screen.queryByText("Crabapple");
    const q1Choice = screen.queryByText("Elephant");
    const q3Choice = screen.queryByText("Persian");
    const q2Choice = screen.queryByText("6-12 years");

    fireEvent.click(q14Choice);
    fireEvent.click(q1Choice);
    fireEvent.click(q3Choice);
    fireEvent.click(q2Choice);

    const submit = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submit);

    const testAttemptArray = [
      { qID: 2, answer: "6-12 years" },
      { qID: 3, answer: "Persian" },
      { qID: 1, answer: "Elephant" },
      { qID: 14, answer: "Crabapple" },
    ];

    expect(submitQuiz).toHaveBeenCalled();
    const attemptArray = submitQuiz.mock.calls[0][0];

    expect(attemptArray).toStrictEqual(testAttemptArray);
  });

  test("Quiz: Correct questions passed to quizResults", () => {
    const testLearningGoals = ["4", "3"];
    const submitQuiz = jest.fn();
    render(
      <Quiz
        data={testQuiz}
        learningGoals={testLearningGoals}
        submitQuiz={submitQuiz}
      />
    );
    const testQuizQuestionsArray = [
      {
        qID: 14,
        learningGoal: 3,
        question: "What apple variant is native to North America?",
        choices: ["Crabapple", "Gala", "Honeycrisp", "Empire"],
      },
      {
        qID: 18,
        learningGoal: 4,
        question: "Which pokemon is the only pokemon that can devolve?",
        choices: ["Raichu", "Slowbro", "Machamp", "Torterra"],
      },
    ];

    const submit = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submit);

    expect(submitQuiz).toHaveBeenCalled();
    const quizQuestionsArray = submitQuiz.mock.calls[0][1];

    expect(testQuizQuestionsArray).toStrictEqual(quizQuestionsArray);
  });

  test("Quiz: Answers are bolded when selected", () => {
    render(
      <Quiz data={testQuiz} learningGoals={["1", "3"]} submitQuiz={jest.fn()} />
    );

    const choiceA = screen.queryByText("Crabapple");
    const choiceB = screen.queryByText("Gala");
    const choiceC = screen.queryByText("Honeycrisp");
    const choiceD = screen.queryByText("Empire");

    expect(choiceA).toHaveStyle("font-weight: lighter");
    fireEvent.click(choiceA);
    expect(choiceA).toHaveStyle("font-weight: bold");
    expect(choiceB).toHaveStyle("font-weight: lighter");
    expect(choiceC).toHaveStyle("font-weight: lighter");
    expect(choiceD).toHaveStyle("font-weight: lighter");
  });

  test("Quiz: Only select one answer at a time", () => {
    render(
      <Quiz data={testQuiz} learningGoals={["1", "3"]} submitQuiz={jest.fn()} />
    );

    const choiceA = screen.queryByText("Crabapple");
    const choiceB = screen.queryByText("Gala");
    const choiceC = screen.queryByText("Honeycrisp");
    const choiceD = screen.queryByText("Empire");

    expect(choiceA).toHaveStyle("font-weight: lighter");
    fireEvent.click(choiceA);
    expect(choiceA).toHaveStyle("font-weight: bold");
    expect(choiceB).toHaveStyle("font-weight: lighter");
    expect(choiceC).toHaveStyle("font-weight: lighter");
    expect(choiceD).toHaveStyle("font-weight: lighter");

    fireEvent.click(choiceB);
    expect(choiceA).toHaveStyle("font-weight: lighter");
    expect(choiceB).toHaveStyle("font-weight: bold");
    expect(choiceC).toHaveStyle("font-weight: lighter");
    expect(choiceD).toHaveStyle("font-weight: lighter");
  });
});

/*
describe("Quiz: button test", () => {
  let testQuiz;
  let testLearningGoals;

  beforeEach(() => {
    testQuiz = quiz.map((question) => ({ ...question })); // isolate question in case the components alter it (which they shouldn't)
    testLearningGoals = learningGoals.map((goal) => ({...goal}))
  });

  describe("Student selects only one answer", () => {
    test("", () => {
      render(<Quiz
        learningGoals={testLearningGoals}
        submitQuiz
      />)
    })
  })


})
*/

/*
  const choiceA = screen.queryByDisplayValue("Crabapple")
  const choiceB = screen.queryByText("Gala")
  const choiceC = screen.queryByText("Honeycrisp")
  const choiceD = screen.queryByText("Empire")
    
    
    expect(choiceA).toHaveStyle("font-weight: lighter");
    fireEvent.click(choiceA)
    expect(choiceA).toHaveStyle("font-weight: bold");
    expect(choiceB).toHaveStyle("font-weight: lighter");
    expect(choiceC).toHaveStyle("font-weight: lighter");
    expect(choiceD).toHaveStyle("font-weight: lighter"); 
  */

/*
    beforeEach(() => {
    testQuiz = questions.map((question) => ({ ...question })); // isolate question in case the components alter it (which they shouldn't)
    testLearningGoals = learningGoals.map((goal) => ({...goal}))
  });
  */
