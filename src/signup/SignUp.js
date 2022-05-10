import { Fragment, useContext, useRef, useState } from "react";
import styles from "./signup.module.css";
import classes from "./signupAvatar.module.css";
import Modal from "../stuff/Modal";
import profile from "../stuff/profile.png";
import AuthContext from "../store/auth-context";

const Signup = (props) => {
  const usernameRef = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState("Sign Up");
  const [have, setHave] = useState(null);
  const [error, setError] = useState(null);
  const [imgUrl, setImgUrl] = useState(profile);
  const [imgFile, setImgFile] = useState();
  const authCtx = useContext(AuthContext);

  const authSignUp = async () => {
    setHave(false);
    setLoading("loading...");
    setError(false);
    try {
      const users = await fetch("http://localhost:4000/user");
      const usersList = await users.json();
      for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].username === usernameRef.current.value) {
          setHave(true);
          setLoading("Sign Up");
          return;
        }
      }
      const response = await fetch("http://localhost:4000/user/signup", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          name: nameRef.current.value,
        }),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
      setLoading("Signed Up");
      alert("Done, Please Login");
      props.hideSignupHandler();
    } catch (error) {
      setError(true);
      setLoading("Sign Up");
      console.log(error);
    }
  };
  const avatarUpload = async () => {
    try {
      if (!imgFile) return;

      console.log(imgFile);

      const formData = new FormData();
      formData.append("avatar", imgFile);
      const response = await fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        requiresAuth: true,
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${authCtx.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw Error(response.status);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("err", error.message);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // authSignUp();
    avatarUpload();
  };

  const imageHandler = (image) => {
    const imgUrl = URL.createObjectURL(image.target.files[0]);
    const img = image.target.files[0];
    setImgFile(img);
    setImgUrl(imgUrl);
  };

  return (
    <Fragment>
      <form className={styles.signup} onSubmit={onSubmitHandler}>
        <div className={classes.avatarUpload}>
          <div className={classes.avatarEdit}>
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={imageHandler}
              required
            />
            <label htmlFor="imageUpload"></label>
          </div>
          <div className={classes.avatarPreview}>
            <div
              id="imagePreview"
              style={{ backgroundImage: `url(${imgUrl})` }}
            ></div>
          </div>
        </div>
        <label>Username: </label>
        <input
          className={styles.input}
          type="text"
          ref={usernameRef}
          required
        />
        <label>name: </label>
        <input className={styles.input} type="text" ref={nameRef} required />
        <p>
          You already have an account?{" "}
          <span onClick={props.showLoginHandler}>Log in</span>
        </p>
        <button>{loading}</button>
        {have && <p>This username has taken, choose another one.</p>}
        {error && <p>Something went wrong, pls try again.</p>}
      </form>
      <Modal hideHandler={props.hideHandler} />
    </Fragment>
  );
};

export default Signup;
