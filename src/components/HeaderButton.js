import { useUser } from "../contexts/UserContext";
// import styles from "../styles/headerButton.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
// import styles from "../styles/headerButton.css";
import { useRouter } from "next/router";

export default function HeaderButton() {
  const user = useUser();
  const router = useRouter();

  return (
    <div>
      <span className="position-absolute top-0 start-0">
        <Button onClick={() => router.push("/")}>Home</Button>
      </span>
      <span className="position-absolute top-0 end-0">
        <Button onClick={() => router.push("/")}>
          {user ? user.email : "Log in"}
        </Button>
      </span>
    </div>
  );
}
