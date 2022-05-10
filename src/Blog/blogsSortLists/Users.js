import { useCallback, useEffect, useState } from "react";
import styles from "./sortStyles.module.css";
import OneUserSort from "./OneUserSort";

const Users = () => {
  const [users, setUsersList] = useState([]);
  const usersList = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:4000/user/");
      const data = await response.json();
      setUsersList(data);
    } catch {}
  }, []);

  useEffect(() => {
    usersList();
  }, [usersList]);

  return (
    <div className={styles.users}>
      {users.map((user, i) => (
        <OneUserSort
          key={i}
          username={user.username}
          name={user.name}
          imgurl={user.imgurl}
          id={user._id}
        />
      ))}
    </div>
  );
};
export default Users;
