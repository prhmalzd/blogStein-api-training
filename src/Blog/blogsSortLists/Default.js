import OneBlog from "../OneBlog";
import styles from "./sortStyles.module.css";
const Default = (props) => {
  if (!!!props.blogs.length) {
    return (
      <div className={styles.nothingToShow}>
        <p>Nothing to Show</p>
        <p>be the first one to post blog.</p>
      </div>
    );
  } else {
    return (
      <div>
        {props.blogs.map((blog, i) => (
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

export default Default;
