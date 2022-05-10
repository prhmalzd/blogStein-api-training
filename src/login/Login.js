import { useRef, useState, useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import styles from "./login.module.css";
import Modal from "../stuff/Modal";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState("log in");
  const [error, setError] = useState(null);
  const [notMember, setNotMember] = useState(false);

  const authLogin = async () => {
    setLoading("loading...");
    setError(false);
    setNotMember(false);
    try {
      const users = await fetch("http://localhost:4000/user");
      const usersList = await users.json();
      const listValidity = usersList.map(
        (userList) => userList.username === usernameRef.current.value
      );
      const isValid = listValidity.includes(true);
      if (!isValid) {
        setNotMember(true);
        setLoading("log in");
        return;
      }
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      authCtx.login(data.token, usernameRef.current.value);
      history.replace("/blog");
      props.hideLoginHandler();
    } catch (error) {
      setError(true);
      setLoading("log in");
      console.log(error);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    authLogin();
  };
  return (
    <Fragment>
      <form className={styles.login} onSubmit={onSubmitHandler}>
        <label>Username: </label>
        <input type="text" ref={usernameRef} />
        <label>Password: </label>
        <input type="password" ref={passwordRef} />
        <button>{loading}</button>
        {notMember && (
          <p>
            You dont have an account, pls{" "}
            <span onClick={props.showSignupHandler}>Sign Up</span>
          </p>
        )}
        {error && (
          <p>
            Your password is incurrect, <Link>Forgot Password?</Link>
          </p>
        )}
      </form>
      <Modal hideHandler={props.hideHandler} />
    </Fragment>
  );
};

export default Login;
