import { useParams } from "react-router-dom";
import OneBlog from "../Blog/OneBlog";
import styles from "./profilePage.module.css";
import { useCallback, useEffect, useState } from "react";
import profile from "../stuff/profile.png";

const OneUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userBLog, setUserBlog] = useState([]);
  const [nothingToShow, setNothingToShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    imgurl: "",
  });
  const params = useParams();
  const userBlogs = useCallback(async () => {
    setNothingToShow(false);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/blog/by-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: params._id,
        }),
      });
      if (!response.ok) {
        throw Error("nothing");
      }
      const data = await response.json();
      if (!data.length) {
        setNothingToShow(true);
      } else {
        const reverseData = data.reverse();
        setUserBlog(reverseData);
      }
    } catch (err) {
      console.log(err.message);
    }

    const responseUser = await fetch("http://localhost:4000/user/");
    if (!responseUser.ok) {
      throw new Error(responseUser.status);
    }
    const dataUser = await responseUser.json();
    const user = dataUser.find((oneUser) => {
      if (oneUser._id === params._id) {
        return {
          username: oneUser.username,
          name: oneUser.name,
          imgurl: oneUser.imgurl,
        };
      }
    });
    setUserInfo(user);
    setIsLoading(false);
  }, [params._id]);

  useEffect(() => {
    userBlogs();
  }, [userBlogs]);

  return (
    <div className={styles.container}>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.profileHolder}>
        <div className={styles.bgProfile}></div>
        <img src={profile} alt={"profile"} />
        <p>@{userInfo.username}</p>
        <p>{userInfo.name}</p>
      </div>
      {!nothingToShow && (
        <div>
          {userBLog.map((blog, i) => (
            <OneBlog
              key={i}
              id={blog._id}
              writerId={blog.creatorId}
              title={blog.title}
              content={blog.content}
              imgurl={blog.imgurl}
            />
          ))}
        </div>
      )}
      {nothingToShow && (
        <div className={styles.nothingToShow}>
          <p>Nothing to Show yet, lets start writting.</p>
        </div>
      )}
    </div>
  );
};

export default OneUserPage;
