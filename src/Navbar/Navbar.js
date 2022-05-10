import { Link, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { Fragment, useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/SignUp";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [loginPage, setLoginPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/homepage");
  };

  const showLoginHanlder = () => {
    setSignupPage(false);
    setLoginPage(true);
  };
  const showSignupHanlder = () => {
    setLoginPage(false);
    setSignupPage(true);
  };
  const hideLogin = () => {
    setLoginPage(false);
  };
  const hideSignUp = () => {
    setSignupPage(false);
  };
  const hideHandler = () => {
    setSignupPage(false);
    setLoginPage(false);
  };
  return (
    <Fragment>
      {loginPage && (
        <Login
          hideLoginHandler={hideLogin}
          showSignupHandler={showSignupHanlder}
          hideHandler={hideHandler}
        />
      )}
      {signupPage && (
        <Signup
          hideSignupHandler={hideSignUp}
          showLoginHandler={showLoginHanlder}
          hideHandler={hideHandler}
        />
      )}
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/homepage">BLogStein</Link>
        </div>
        {!authCtx.isLoggedIn && (
          <ul className={styles.auth}>
            <li className={styles.li} onClick={showLoginHanlder}>
              Log in
            </li>
            <span>/</span>
            <li className={styles.li} onClick={showSignupHanlder}>
              Sign up
            </li>
          </ul>
        )}
        {authCtx.isLoggedIn && (
          <ul className={styles.auth}>
            <li className={styles.link2}>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className={styles.link2}>
              <NavLink to="/blog">Home</NavLink>
            </li>
            <li onClick={logoutHandler} className={styles.link2}>
              <NavLink to="/homepage">Logout</NavLink>
            </li>
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default Navbar;
