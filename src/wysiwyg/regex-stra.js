import styles from "./wysiwyg.module.css";
import { CompositeDecorator } from "draft-js";

// this file is for Hashtags and Mentions handleing .
const HANDLE_REGEX = /(?:^|\\s|$|[.])@[\\p{L}0-9_]*/g;
const HASHTAG_REGEX = /(^|\s)(#[a-z\d-]+)/g;

export function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

export function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export const HandleSpan = (props) => {
  return (
    <span className={styles.handle} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

export const HashtagSpan = (props) => {
  return (
    <span className={styles.hashtag} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

export const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan,
  },
  {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
]);
