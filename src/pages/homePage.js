import { useUser } from "../contexts/UserContext";
import Paper from "@mui/material/Paper";
export default function HomePage() {
  const user = useUser();

  console.log(user.first);
  console.log(user.last);

  const studentName = user.first + user.last;

  return <Paper>Welcome {studentName}</Paper>;
}
