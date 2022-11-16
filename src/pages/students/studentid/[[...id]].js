//import StudentList from "../../components/StudentList"
//import ProfessorView from "../../components/ProfessorView"

import StudentProgress from "../../../components/StudentProgress";

export default function StudentID(currentStudent) {
  return (
    <div>
      <StudentProgress currentStudent={currentStudent} />
    </div>
  );
}
