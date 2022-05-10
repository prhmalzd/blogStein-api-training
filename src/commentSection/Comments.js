import OneComment from "./OneComment";
import styles from "./comments.module.css";
import { useEffect, useState } from "react";

const Comments = (props) => {
  const [srtedComments, setSortedComments] = useState([]);
  const [clicked, setClicked] = useState();
  useEffect(() => {
    setSortedComments(props.comments);
  }, [props.comments]);
  const onChangeSort = (e) => {
    const id = e.target.id;
    if (id === "new") {
      setClicked(1);
    } else if (id === "last") {
      setClicked(2);
    }
    props.changeSort(id, clicked);
  };
  return (
    <div className={styles.comments}>
      <ul className={styles.srotComments}>
        <li onClick={onChangeSort} id="last">
          Lastest
        </li>
        <li onClick={onChangeSort} id="new">
          Newest
        </li>
      </ul>
      {srtedComments.map((comment, i) => (
        <OneComment
          key={i}
          date={comment.createdAt}
          text={comment.text}
          userId={comment.userId}
          username={props.username}
        />
      ))}
    </div>
  );
};

export default Comments;
