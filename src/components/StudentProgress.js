/*

    currentStudent: an object (Required)

*/

//hu8JIMxDgXViQSUilZUMQveEfDr2

import { useEffect, useState } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import PropTypes from "prop-types";

function StudentProgress({ studentId }) {
  //const router = useRouter();
  //const studentId = router.query.id;
  const [studentInfo, setStudentInfo] = useState();

  useEffect(() => {
    const getStudent = async () => {
      const db = getFirestore();
      const studentsDocRef = doc(db, "students", studentId);
      const studentDocSnap = await getDoc(studentsDocRef);
      setStudentInfo(studentDocSnap.data());
    };
    getStudent();
  }, [studentId]);

  return <div>{studentInfo?.name}</div>;
}

StudentProgress.propTypes = {
  studentId: PropTypes.number.isRequired,
};

export default StudentProgress;
