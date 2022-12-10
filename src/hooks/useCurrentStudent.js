import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";
import PropTypes from "prop-types";

export default function useCurrentStudent() {
  const [userInfo, setUserInfo] = useState();

  const user = useUser();

  async function getStudentSnapshot(id) {
    const db = getFirestore();
    const studentSnap = await getDoc(doc(db, "students", id));
    if (studentSnap.exists()) {
      setUserInfo({ ...studentSnap.data() });
    } else {
      setUserInfo();
    }
  }

  useEffect(() => {
    const userID = user && user.uid;
    if (userID) {
      getStudentSnapshot(userID);
    } else {
      setUserInfo();
    }
  }, [user]);

  return userInfo;
}

useCurrentStudent.propTypes = {
  id: PropTypes.string.isRequired,
};
