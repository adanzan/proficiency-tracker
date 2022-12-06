/*
    ProfessorView.js
    
    ProfessorView welcomes the user and also functions as a dashboard.
    
    If the button 'Create a new quiz' is clicked, a new quiz is can be 
    made and disseminated.

    If the button "Students" is clicked, the router will be called to 
    take the user to the list of students in the class. 

    props:
        Name - Professor's name input from login (must be a string)
*/
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styles from "../styles/viewing.module.css";

export default function ProfessorView() {
  const router = useRouter();

  return (
    <div className={styles.round}>
      <h1>Hello, Professor Andrews!</h1>

      <button className={styles.button}>Create new Quiz!</button>

      <input
        type="button"
        value="Students"
        onClick={() => router.push("students/")}
        className={styles.button}
      />
    </div>
  );
}

ProfessorView.propTypes = {
  Name: PropTypes.string.isRequired,
};
