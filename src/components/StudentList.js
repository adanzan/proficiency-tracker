/*
    StudentList.js

    This page provides a list of students in the class. If a Student is clicked
    a history of the student's quizzes, learning goal progress, and scores are 
    displayed.

    props:
    StudentNames - list of students in the class
*/

import { useRouter } from "next/router";
import styles from "../styles/viewing.module.css";

//import StudentProgress from "./StudentProgress";

const fakeStudents = [
  {
    studentID: 1,
    first: "Jlair",
    last: "Bia",
    email: "<jbia@middlebury.edu>",
    password: "iliketosing",
  },
  {
    studentID: 2,
    first: "Krelyn",
    last: "Eviter",
    email: "<keviter@middlebury.edu>",
    password: "troyboltonisking",
  },
  {
    studentID: 3,
    first: "Zellie",
    last: "Nhang",
    email: "<znhang@middlebury.edu>",
    password: "troyboltonisking",
  },
  {
    studentID: 4,
    first: "Gmith",
    last: "Sakuya",
    email: "<gsakuya@middlebury.edu>",
    password: "troyboltonisking",
  },
  {
    studentID: 5,
    first: "Fulia",
    last: "Jairbank",
    email: "<fjairbank@middlebury.edu>",
    password: "troyboltonisking",
  },
  {
    studentID: 6,
    first: "Cent",
    last: "Kanonigo",
    email: "<ckanonigo@middlebury.edu>",
    password: "troyboltonisking",
  },
  {
    studentID: 7,
    first: "Aanzan",
    last: "Dchit-Erdene",
    email: "<adchit@middlebury.edu>",
    password: "troyboltonisking",
  },
];

export default function StudentList() {
  const router = useRouter();

  const names_sorted = [...fakeStudents];
  names_sorted.sort((a, b) => a.first.localeCompare(b.first));

  // const setCurrentStudent = (studentObject) => {
  //     currentStudent = studentObject;
  // }

  const studentNames = names_sorted.map((student) => (
    <li
      key={student.first}
      data-testid="studentID"
      onClick={() => router.push(`/professor/students/${student.studentID}`)}
      //   onChange={(event) => {
      //     setCurrentStudent(event.target.value);
      //}}
    >
      {student.first} {student.last}
    </li>
  ));

  return (
    <div className={styles.round}>
      <h1>Students</h1>
      <ul>{studentNames}</ul>
    </div>
  );
}
