import OneBlog from "../Blog/OneBlog";
import NewBlog from "../Blog/NewBlog";
import styles from "./profilePage.module.css";
import { useCallback, useContext, useState, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import profile from "../stuff/profile.png";

const ProfilePage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [myBlogs, setMyBlogs] = useState([]);
  const [nothingToShow, setNothingToShow] = useState(false);
  const [activatedData, setActivatedData] = useState({
    monthName: "Getting Data",
    yearTime: "",
  });
  const [bio, setBio] = useState("");
  const [myInfo, setMyInfo] = useState({});

  const myblogs = useCallback(async () => {
    setNothingToShow(false);
    setIsLoading(true);
    const userResponse = await fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${authCtx.token}`,
      },
      requiresAuth: true,
    });
    const userData = await userResponse.json();
    setMyInfo(userData);

    const time = new Date(userData.createdAt);
    const monthTime = time.getMonth() + 1;
    const yearTime = time.getFullYear();
    const monthName = authCtx.getMonth(monthTime);
    setActivatedData({ monthName, yearTime });

    if (userData.bio) {
      setBio(userData.bio);
    }

    try {
      const response = await fetch("http://localhost:4000/blog/my-blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${authCtx.token}`,
        },
        requiresAuth: true,
      });
      if (!response.ok) {
        throw Error("nothing to show");
      }
      const data = await response.json();
      const blogs = data.map((blogdata) => {
        return {
          writer: blogdata.creatorId,
          id: blogdata._id,
          title: blogdata.title,
          content: blogdata.content,
          imgUrl: blogdata.imgurl,
        };
      });
      const reverseblogs = blogs.reverse();
      setMyBlogs(reverseblogs);
    } catch (err) {
      if (err.message === "nothing to show") {
        setNothingToShow(true);
      }
    }
    setIsLoading(false);
  }, [authCtx]);

  useEffect(() => {
    myblogs();
  }, [myblogs]);

  const blogsListRefresher = () => {
    myblogs();
  };

  const profileEditHandler = () => {
    history.push("/profile/edit");
  };

  return (
    <div className={styles.container}>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.profileHolder}>
        <div className={styles.bgProfile}></div>
        <img src={profile} alt={"profile"} />
        <p>@{myInfo.username}</p>
        <p>{myInfo.name}</p>
        <p>Bio: {bio}</p>
        <p>
          Created at: {activatedData.monthName}, {activatedData.yearTime}
        </p>
        <button className={styles.editProfileBtn} onClick={profileEditHandler}>
          Edit Profile
        </button>
      </div>
      {!isLoading && <NewBlog blogsListRefresher={blogsListRefresher} />}
      {!nothingToShow && (
        <div>
          {myBlogs.map((blog, i) => (
            <OneBlog
              key={i}
              id={blog.id}
              writerId={blog.writer}
              title={blog.title}
              content={blog.content}
              imgurl={blog.imgUrl}
              editable={true}
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

export default ProfilePage;
