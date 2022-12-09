import { useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";

export const useCurrentUser = () => {
  const [userInfo, setUserInfo] = useState();

  const user = useUser();

  async function getStudentSnapshot(id) {
    const db = getFirestore();
    const studentSnapshot = await getDoc(doc(db, "students", id));
    if (studentSnapshot.exists()) {
      setUserInfo({ ...articleSnapshot.data() });
    } else {
      setUserInfo();
    }
  }

  // Retrieve user information if user exists
  if (user) {
    getStudentSnapshot(user.uid);
  }

  return userInfo;
};
