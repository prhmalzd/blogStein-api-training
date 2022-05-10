import { useEffect, useCallback, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./blog.module.css";
import profile from "../stuff/profile.png";
import AuthContext from "../store/auth-context";
import parse from "html-react-parser";
import ScoreArea from "../stuff/ScoreArea";

const OneBlog = (props) => {
  const authCtx = useContext(AuthContext);
  const contnetValue = props.content;
  const history = useHistory();
  const [userInfo, setUserInfo] = useState([
    { username: "", name: "", imgurl: "" },
  ]);
  const users = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/user/");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      const user = data.find((oneUser) => {
        if (oneUser._id === props.writerId) {
          return {
            username: oneUser.username,
            name: oneUser.name,
            imgurl: oneUser.imgurl,
          };
        }
      });
      setUserInfo(user);
    } catch {}
  }, [props.writerId]);

  useEffect(() => {
    users();
  }, [users]);

  const onProfileVisit = () => {
    if (authCtx.username === userInfo.username) history.push("/profile");
    else history.push(`/user/${props.writerId}`);
  };

  const onBlogVisit = () => {
    history.push(`/blog/${props.id}`);
  };

  return (
    <div className={styles.blog}>
      <div className={styles.avatarHolder} onClick={onProfileVisit}>
        <img src={profile} alt="none" />
        <p>{userInfo.name}</p>
        <p>@{userInfo.username}</p>
      </div>
      <div className={styles.oneBlog} onClick={onBlogVisit}>
        <div className={styles.blogContent}>
          <h1 className={styles.h1}>{props.title}</h1>
          <div className={styles.div}>{parse(contnetValue)}</div>
        </div>
        <ScoreArea
          score={props.score}
          id={props.id}
          oneBlogRefresher={props.oneBlogRefresher}
        />
      </div>
      {props.edited && <p className={styles.edited}>(Edited)</p>}
    </div>
  );
};

export default OneBlog;
