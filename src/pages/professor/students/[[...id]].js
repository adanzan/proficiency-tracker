import StudentList from "../../../components/StudentList";
import { useRouter } from "next/router";
import StudentProgress from "../../../components/StudentProgress";
//import ProfessorView from "../../components/ProfessorView"

export default function Students() {
  const router = useRouter();
  const studentId = router.query.id;
  return (
    <div>
      {studentId ? <StudentProgress studentId={studentId} /> : <StudentList />}
    </div>
  );
}
