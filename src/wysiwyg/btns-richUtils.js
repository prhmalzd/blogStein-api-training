// this is for Utils section in WYYSIWYG
import "draft-js/dist/Draft.css";
import styles from "./wysiwyg.module.css";

const BLOCK_TYPES = [
  {
    label: "H1",
    style: "header-one",
  },
  {
    label: "H2",
    style: "header-two",
  },
  {
    label: "H3",
    style: "header-three",
  },
  {
    label: "H4",
    style: "header-four",
  },
  {
    label: "H5",
    style: "header-five",
  },
  {
    label: "H6",
    style: "header-six",
  },
  {
    label: "UL",
    style: "unordered-list-item",
  },
  {
    label: "OL",
    style: "ordered-list-item",
  },
];

const INLINE_STYLES = [
  {
    label: "Bold",
    style: "BOLD",
  },
  {
    label: "Italic",
    style: "ITALIC",
  },
  {
    label: "Underline",
    style: "UNDERLINE",
  },
  {
    label: "Monospace",
    style: "CODE",
  },
];

const StyleButton = (props) => {
  const onToggle = (event) => {
    event.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <span
      className={`${props.active && styles.activated} ${styles.styleBtn}`}
      onMouseDown={onToggle}
    >
      {props.label}
    </span>
  );
};

export const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={styles.inlineStyleControls}>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

export const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};
