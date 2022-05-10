import OneBlog from "../OneBlog";
import styles from "./sortStyles.module.css";

const TopBlogs = (props) => {
  if (!!!props.blogs.length) {
    return (
      <div className={styles.nothingToShow}>
        <p>Nothing to Show</p>
        <p>be the first one to post blog.</p>
      </div>
    );
  } else {
    const newBlogsList = [];
    for (let i = 0; i < props.blogs.length; i++) {
      const randomBlog =
        props.blogs[Math.floor(Math.random() * props.blogs.length)];
      newBlogsList.push(randomBlog);
    }
    return (
      <div>
        {newBlogsList.map((blog, i) => (
          <OneBlog
            key={i}
            id={blog.id}
            writerId={blog.writerId}
            title={blog.title}
            content={blog.content}
            imgurl={blog.imgurl}
            score={blog.score}
          />
        ))}
      </div>
    );
  }
};
export default TopBlogs;
