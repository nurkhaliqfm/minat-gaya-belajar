import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";

{
  /* <div className="text-editor">
                  <EditorToolbar />
                  <ReactQuill
                    theme="snow"
                    // value={state.value}
                    // onChange={handleChange}
                    placeholder={"Write something awesome..."}
                    modules={modules}
                    formats={formats}
                  />
                </div> */
}

const Size = Quill.import("formats/size");
Size.whitelist = ["small", "medium", "large"];
Quill.register(Size, true);

export const modules = {
  // formula: true,
  toolbar: {
    container: "#toolbar",
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

export default function QuillToolbar() {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-size" defaultValue="medium">
          <option value="small">Size 1</option>
          <option value="medium">Size 2</option>
          <option value="large">Size 3</option>
        </select>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-image" />
        <button className="ql-formula" />
        <button className="ql-clean" />
      </span>
    </div>
  );
}
