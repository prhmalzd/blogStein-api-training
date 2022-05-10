import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import styles from "./newBlog.module.css";
import { Editor } from "@tinymce/tinymce-react";

const EditBlog = (props) => {
  const [loading, setLoading] = useState("Change it");
  const [error, setError] = useState(false);
  const [erorrTheme, setErorrTheme] = useState(false);
  const editorRef = useRef(null);
  const titleref = useRef();
  const authCtx = useContext(AuthContext);

  const editSubmit = async () => {
    const myContent = editorRef.current.getContent();
    const imageurl = "lol";
    setLoading("Changing...");
    await fetch("http://localhost:4000/blog/edit", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${authCtx.token}`,
      },
      body: JSON.stringify({
        blogId: props.id,
        data: {
          title: titleref.current.value,
          content: myContent,
          imgurl: imageurl,
        },
      }),
    });
    alert("Done");
    props.oneBlogRefresher();
    setLoading("Change it");
  };

  const editHandler = () => {
    setError(0);
    const myContent = editorRef.current.getContent({ format: "text" });
    if (!titleref.current.value.trim()) {
      setError(1);
      setErorrTheme(true);
      titleref.current.value = "";
      return;
    } else if (!myContent.trim()) {
      setError(2);
    } else {
      editSubmit();
      titleref.current.value = "";
    }
  };
  const blurHandler = () => {
    if (!titleref.current.value) {
      setErorrTheme(true);
    }
  };
  const changeInputHandler = () => {
    setErorrTheme(false);
  };
  return (
    <div className={`${styles.postArea}`}>
      <div className={styles.titleArea}>
        <label className={styles.lableTitle}>Title:</label>
        <input
          type="text"
          placeholder={`${erorrTheme ? "Choose title" : ""}`}
          className={`${styles.title} ${erorrTheme && styles.erorrTheme}`}
          ref={titleref}
          onBlur={blurHandler}
          onChange={changeInputHandler}
        />
      </div>
      <Editor
        apiKey="v9lm1vr7lm93q9vz7at69l4gux56ayrc42ik38qj5tdok0gv"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={props.content}
        init={{
          placeholder: "What's up buddy...",
          selector: "textare#default",
          height: 300,
          width: 1000,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          menubar: "file edit view insert format tools table",
          menu: {
            file: {
              title: "File",
              items:
                "newdocument restoredraft | preview | export print | deleteallconversations",
            },
            edit: {
              title: "Edit",
              items:
                "undo redo | cut copy paste pastetext | selectall | searchreplace",
            },
            view: {
              title: "View",
              items:
                "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
            },
            insert: {
              title: "Insert",
              items:
                "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
            },
            format: {
              title: "Format",
              items:
                "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
            },
            tools: {
              title: "Tools",
              items:
                "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
            },
            table: {
              title: "Table",
              items:
                "inserttable | cell row column | advtablesort | tableprops deletetable",
            },
            help: { title: "Help", items: "help" },
          },
        }}
      />
      {error === 1 && <p className={styles.error}>Choose a title...</p>}
      {error === 2 && <p className={styles.error}>Write something...</p>}
      <button className={`${styles.postBtn}`} onClick={editHandler}>
        {loading}
      </button>
    </div>
  );
};

export default EditBlog;
