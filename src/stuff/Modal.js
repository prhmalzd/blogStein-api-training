import styles from "./modal.module.css";
const Modal = (props) => {
  return <div className={styles.modal} onClick={props.hideHandler}></div>;
};

export default Modal;
