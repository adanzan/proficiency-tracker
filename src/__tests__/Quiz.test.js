/*
Quiz test
4. Submit button brings us to learning goals page
2. Submit button submits answers that are currently selected -- shows empty string for unpicked answer
5. Order of answer array is the same as the order of the question array

1. Correct questions are being displayed onto test -- quiz questions array reflects displayed questions
3. Choices can be selected and can only select one
*/

import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../pages/index";
//import data from "../../data/Fake_Questions.json";

// replace the router with the mock
//jest.mock("next/router", () => require("next-router-mock"));

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
];

//const learningGoals = ["1", "3"]

describe("Quiz", () => {
  const testQuiz = questions.map((question) => ({ ...question }));
  const testLearningGoals = ["1", "3"];

  test("Quiz: Answers recorded once after submit button clicked", () => {
    const submitQuiz = jest.fn();
    render(
      <Quiz
        data={testQuiz}
        learningGoals={testLearningGoals}
        submitQuiz={submitQuiz}
      />
    );

    screen.debug();
    //const q14Choice = screen.queryByText("Crabapple")
    const q1Choice = screen.queryByText("Elephant");
    const q3Choice = screen.queryByText("Persian");
    const q2Choice = screen.queryByText("6-12 years");
    //const submit = screen.queryByRole("Submit")

    //fireEvent.click(q14Choice);
    fireEvent.click(q1Choice);
    fireEvent.click(q3Choice);
    fireEvent.click(q2Choice);
    //fireEvent.click(submit);

    const testAttemptArray = [
      { qID: 14, answer: "Crabapple" },
      { qID: 1, answer: "Elephant" },
      { qID: 3, answer: "Persian" },
      { qID: 2, answer: "6-12 years" },
    ];
    //const testAttemptArray = [{ qID: 14, answer: "" },{ qID: 1, answer: "" }, { qID: 3, answer: "" }, { qID: 2, answer: "" }]
    //const testAttemptArray = [{ qID: 1, answer: "Elephant" }, { qID: 3, answer: "Persian" }, { qID: 2, answer: "6-12 years" }]

    //expect(q1Choice).toHaveStyle("font-weight: bold");
    expect(attemptArray).toBe(testAttemptArray);
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

  test("Quiz: Previous user selected answers become unbolded after another answer to the question is selected", () => {
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
