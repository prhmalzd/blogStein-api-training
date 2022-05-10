import styles from "./container.module.css";
import { Link } from "react-router-dom";
import homePageImg from "../stuff/homePage.png";

const Container = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageHolder}>
        <img src={homePageImg} alt="home page" />
      </div>
      <div className={styles.content}>
        <h1>It's Never Too Late to Write</h1>
        <p>
          Pariatur dolore ullamco minim occaecat minim aliqua ad excepteur id
          magna commodo proident. Nostrud magna ad ipsum magna eiusmod eiusmod
          reprehenderit aliqua culpa duis deserunt et mollit. Consequat sunt et
          do labore ex qui adipisicing dolor elit magna deserunt consectetur ex.
          Ullamco laborum ipsum proident id eu minim nulla quis dolore enim aute
          aute Lorem duis.
        </p>
        <Link to="/blog">
          <button>Read Others</button>
        </Link>
      </div>
    </div>
  );
};

export default Container;
