import { useEffect, useState, useContext } from "react";
import styles from "./score.module.css";
import AuthContext from "../store/auth-context";

const ScoreArea = (props) => {
  const authCtx = useContext(AuthContext);
  const [aveScore, setAveScore] = useState();
  const [showVote, setShowVote] = useState(false);
  useEffect(() => {
    setAveScore(props.score);
  }, [props.score]);

  const onSubmitScore = (e) => {
    const t = Number(e.target.innerText);
    setAveScore(t);
    setShowVote(true);
  };
  const rateVote = async () => {
    try {
      const response = await fetch("http://localhost:4000/blog/submit-rate", {
        method: "POST",
        requiresAuth: true,
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${authCtx.token}`,
        },
        body: JSON.stringify({
          blogId: props.id,
          score: aveScore,
        }),
      });
      if (!response.ok) {
        throw Error(response.status);
      }
      setShowVote(false);
      setAveScore(props.score);
      props.oneBlogRefresher();
    } catch (err) {
      console.log(err);
    }
  };
  const onRateVote = (e) => {
    e.preventDefault();
    rateVote();
  };
  return (
    <div className={styles.spanContainer} onClick={onSubmitScore}>
      <span className={`${aveScore > 0 && styles.spanScored} ${styles.span}`}>
        1
      </span>
      <span className={`${aveScore > 1 && styles.spanScored} ${styles.span}`}>
        2
      </span>
      <span className={`${aveScore > 2 && styles.spanScored} ${styles.span}`}>
        3
      </span>
      <span className={`${aveScore > 3 && styles.spanScored} ${styles.span}`}>
        4
      </span>
      <span className={`${aveScore > 4 && styles.spanScored} ${styles.span}`}>
        5
      </span>
      {showVote && <button onClick={onRateVote}>Rate</button>}
    </div>
  );
};

export default ScoreArea;
