import { useUser } from "../contexts/UserContext";
// import styles from "../styles/headerButton.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
// import styles from "../styles/headerButton.css";

export default function HeaderButton() {
  const user = useUser();

  return (
    <div>
      <span>
        <Button onClick={() => router.push("/")}>Home</Button>

        <Button onClick={() => router.push("/")}>
          {user ? user.email : "Log in"}
        </Button>
      </span>
    </div>
  );
}
