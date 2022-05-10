import OneBlog from "./OneBlog";
import styles from "./blog.module.css";
import { useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useCallback, useEffect, useState, useContext } from "react";
import EditBlog from "./editBlog";
import SubmitComment from "../commentSection/SubmitComment";
import Comments from "../commentSection/Comments";

const OneBlogPage = (props) => {
  const [oneBlog, setOneBlog] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const [edited, setEdited] = useState(false);
  const authCtx = useContext(AuthContext);
  const params = useParams();

  const onBlog = useCallback(async () => {
    setShowEdit(false);
    setEditBtn(false);
    const response = await fetch(`http://localhost:4000/blog/${params._id}`);
    const data = await response.json();
    setOneBlog(data);
    if (data.createdAt.toString() !== data.updatedAt.toString()) {
      setEdited(true);
    }
    const commResponse = await fetch(
      `http://localhost:4000/comment/by-blog/${params._id}`
    );
    if (!commResponse.ok) {
      throw Error(response.status);
    }
    const commData = await commResponse.json();
    setComments(commData);
    const editResponse = await fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${authCtx.token}`,
      },
    });
    const editData = await editResponse.json();
    if (editData._id === data.creatorId) {
      setEditBtn(true);
    }
  }, [authCtx.token, params._id]);
  useEffect(() => {
    onBlog();
  }, [onBlog]);

  const showEditHandler = () => {
    setShowEdit((showEdit) => !showEdit);
  };
  const oneBlogRefresher = () => {
    onBlog();
  };
  const changeSort = (id, c) => {
    if (id === "new" && c === 2) {
      setComments(comments.reverse());
    } else if (id === "last" && c === 1) {
      setComments(comments.reverse());
    }
  };

  return (
    <div className={styles.container}>
      {oneBlog && (
        <OneBlog
          id={params._id}
          writerId={oneBlog.creatorId}
          title={oneBlog.title}
          content={oneBlog.content}
          imgurl={oneBlog.imgurl}
          edited={edited}
          score={oneBlog.averageScore}
          oneBlogRefresher={oneBlogRefresher}
        />
      )}
      {editBtn && (
        <button className={styles.editBtn} onClick={showEditHandler}>
          {!showEdit ? "edit" : "cancel"}
        </button>
      )}
      {showEdit && (
        <EditBlog
          id={params._id}
          writerId={oneBlog.creatorId}
          title={oneBlog.title}
          content={oneBlog.content}
          imgurl={oneBlog.imgurl}
          oneBlogRefresher={oneBlogRefresher}
          createdAt={oneBlog.createdAt}
        />
      )}
      <SubmitComment id={params._id} commentsRefresher={oneBlogRefresher} />
      <p className={styles.title}>" Comments "</p>
      <Comments comments={comments} changeSort={changeSort} />
    </div>
  );
};

export default OneBlogPage;
