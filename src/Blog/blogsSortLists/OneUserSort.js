import styles from "./sortStyles.module.css";
import profile from "../../stuff/profile.png";
import { useHistory } from "react-router-dom";

const OneUserSort = (props) => {
  const history = useHistory();
  const onProfileVisit = () => {
    history.push(`/user/${props.id}`);
  };
  return (
    <div className={styles.userStyle} onClick={onProfileVisit}>
      <img src={profile} />
      <p>@{props.username}</p>
      <p>{props.name}</p>
    </div>
  );
};
export default OneUserSort;
