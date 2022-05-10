import React, { useState } from "react";
import styles from "./wysiwyg.module.css";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import { compositeDecorator } from "./regex-stra";
import {
  InlineStyleControls,
  BlockStyleControls,
  styleMap,
  getBlockStyle,
} from "./btns-richUtils";
import "draft-js/dist/Draft.css";

const Wysiwyg = (props) => {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(compositeDecorator)
  );

  const onChange = (editorState) => {
    setEditorState(editorState);
    const currentState = editorState.getCurrentContent();
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const consoleContent = () => {
    const contentState = editorState.getCurrentContent();
    console.log(contentState.toJS().blockMap);
  };

  return (
    <div className={styles.container}>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={`${styles.editor}`}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder="Tell a story..."
          spellCheck={true}
        />
      </div>
      <button onClick={consoleContent}></button>
    </div>
  );
};
export default Wysiwyg;
