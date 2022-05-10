import { useRef, useContext } from "react";
import styles from "./comments.module.css";
import AuthContext from "../store/auth-context";

const SubmitComment = (props) => {
  const commentRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitComment = async () => {
    try {
      const response = await fetch("http://localhost:4000/comment/submit", {
        method: "POST",
        requiresAuth: true,
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${authCtx.token}`,
        },
        body: JSON.stringify({
          text: commentRef.current.value,
          blogId: props.id,
        }),
      });
      if (!response.ok) {
        throw Error(response.status);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const onSubmitComment = () => {
    submitComment();
    commentRef.current.value = "";
    props.commentsRefresher();
  };
  return (
    <div className={styles.submitComments}>
      <input
        type="text"
        placeholder="submit your comment..."
        ref={commentRef}
        required
      />
      <button onClick={onSubmitComment}>Submit</button>
    </div>
  );
};

export default SubmitComment;
