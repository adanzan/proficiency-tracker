import { useUser } from "../contexts/UserContext";
import styles from "../styles/headerButton.css";

export default function HeaderButton() {
  const user = useUser();

  return (
    <div className={styles.button}>
      <input
        type="button"
        onClick={() => router.push("/")}
        value={user ? user.email : null}
      />

      <input type="button" onClick={() => router.push("/")} value={"Home"} />
    </div>
  );
}
