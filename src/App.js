import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import styles from "./app.module.css";
import Navbar from "./Navbar/Navbar";
import Container from "./Container/Container";
import Blog from "./Blog/Blogs";
import { Switch } from "react-router-dom";
import AuthContext from "./store/auth-context";
import ProfilePage from "./profile/ProfilePage";
import OneUserPages from "./profile/OneUserPage";
import OneBlogPage from "./Blog/OneBlogPage";
import EditProfile from "./profile/EditProfile";
import React, { PureComponent } from "react";
import Footer from "./footer/Footer.js";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={styles.app}>
      <Navbar />
      <Switch>
        <Route path="/homepage">
          <Container />
        </Route>
        <Route path="/blog" exact>
          <Blog />
        </Route>
        <Route path="/blog/:_id">
          <OneBlogPage />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/profile/edit">
            <EditProfile />
          </Route>
        )}
        <Route path="/user/:_id">
          <OneUserPages />
        </Route>
        <Route path="*">
          <Redirect to="/homepage" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
