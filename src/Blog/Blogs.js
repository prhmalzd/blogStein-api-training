import { useEffect, useCallback, useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import styles from "./blog.module.css";
import NewBlog from "./NewBlog";
import Default from "./blogsSortLists/Default";
import TopBlogs from "./blogsSortLists/TopBlogs";
import Users from "./blogsSortLists/Users";

const Blog = () => {
  const [sortBlogs, setSortBlogs] = useState("default");
  const authCtx = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(null);
  const blogsList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/blog/");
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      const blogs = data.map((blogdata) => {
        return {
          score: blogdata.averageScore,
          writerId: blogdata.creatorId,
          id: blogdata._id,
          title: blogdata.title,
          content: blogdata.content,
          imgUrl: blogdata.imgurl,
        };
      });
      const reverseblogs = blogs.reverse();
      setBlogs(reverseblogs);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    blogsList();
  }, [blogsList]);

  const blogsListRefresher = () => {
    blogsList();
  };
  const listHandler = (e) => {
    const targetId = e.target.id;
    setSortBlogs(targetId);
  };
  return (
    <div className={styles.container}>
      <div className={styles.sort}>
        <p>Sort: </p>
        <ul className={styles.ul} onClick={listHandler}>
          <li id="default">Default</li>
          <li id="top">Top blogs</li>
          <li id="writers">Writers</li>
        </ul>
      </div>
      {authCtx.isLoggedIn && sortBlogs === "default" && (
        <NewBlog blogsListRefresher={blogsListRefresher} />
      )}
      {loading && <p className={styles.loading}>Loading...</p>}
      {sortBlogs === "default" && <Default blogs={blogs} />}
      {sortBlogs === "top" && <TopBlogs blogs={blogs} />}
      {sortBlogs === "writers" && <Users />}
    </div>
  );
};

export default Blog;
