import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./comments.module.css";

const OneComment = (props) => {
  const history = useHistory();
  const date = new Date(props.date);
  const day = date.toUTCString();
  const [username, setUsername] = useState("");
  const user = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/singleUser/${props.userId}`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      const data = await response.json();
      setUsername(data.username);
    } catch (err) {
      console.log(err.message);
    }
  }, [props.userId]);
  useEffect(() => {
    user();
  }, [user]);
  const onProfileVisit = () => {
    if (props.username === username) history.push("/profile");
    else history.push(`/user/${props.userId}`);
  };
  return (
    <div className={styles.oneCommnet}>
      <div className={styles.commenter}>
        <p className={styles.acc} onClick={onProfileVisit}>
          @{username}:{" "}
        </p>
        <p className={styles.commentText}> {props.text}</p>
      </div>

      <p className={styles.commentDate}>Commented at: {day}</p>
    </div>
  );
};

export default OneComment;
