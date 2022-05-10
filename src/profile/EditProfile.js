import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import styles from "./editProfile.module.css";

const EditProfile = () => {
  const history = useHistory();
  const [loading, setLoading] = useState("Change it");
  const [erorr, setErorr] = useState(false);
  const [erorrTheme, setErorrTheme] = useState(0);
  const nameRef = useRef();
  const bioRef = useRef();
  const authCtx = useContext(AuthContext);
  const [imgurl, setImgUrl] = useState("");

  const userEdit = async () => {
    setLoading("changing...");
    try {
      const response = await fetch("http://localhost:4000/user/edit", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${authCtx.token}`,
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          bio: bioRef.current.value,
        }),
        requiresAuth: true,
      });
      console.log(response);
      if (!response.ok) {
        throw Error("");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setLoading("Change it");
    history.push("/profile");
  };

  const onImageHandler = (image) => {
    const img = URL.createObjectURL(image.target.files[0]);
    setImgUrl(img);
  };

  const editHandler = () => {
    if (nameRef.current.value && bioRef.current.value && imgurl) {
      userEdit();
    } else {
      setErorr(true);
    }
  };
  const onBlurHandler1 = () => {
    if (!nameRef.current.value) {
      setErorrTheme(1);
    }
  };
  const onBlurHandler2 = () => {
    if (!bioRef.current.value) {
      setErorrTheme(2);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarUpload}>
        <div className={styles.avatarEdit}>
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={onImageHandler}
            required
          />
          <label htmlFor="imageUpload"></label>
        </div>
        <div className={styles.avatarPreview}>
          <div
            id="imagePreview"
            style={{ backgroundImage: `url(${imgurl})` }}
          ></div>
        </div>
      </div>
      <label className={styles.label}>New Name: </label>
      <input
        type="text"
        placeholder={`${erorrTheme === 1 ? "please fill" : ""}`}
        className={`${styles.title} ${erorrTheme === 1 && styles.erorrTheme}`}
        ref={nameRef}
        onBlur={onBlurHandler1}
      />
      <label className={styles.label}>Write Bio: </label>
      <input
        type="text"
        placeholder={`${erorrTheme === 2 ? "please fill" : ""}`}
        className={`${styles.title} ${erorrTheme === 2 && styles.erorrTheme}`}
        ref={bioRef}
        onBlur={onBlurHandler2}
      />
      <button className={`${styles.editBtn}`} onClick={editHandler}>
        {loading}
      </button>
      {erorr && <p className={styles.erorr}>please fill the all holes.</p>}
    </div>
  );
};

export default EditProfile;
