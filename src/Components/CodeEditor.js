import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  handleChange,
  handleSubmit,
  handleEditorDidMount,
  monacoObjects
}) {
  const [fileText, setFileText] = useState(null);

  const getFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async (e) => setFileText(e.target.result);
    reader.readAsText(e.target.files[0]);
  }

  const handleFileSubmit = (e) => {
    e.preventDefault();
    monacoObjects.current.editor.setValue(fileText);
  }

  return (
    <div className="CodeEditor">
      <h2>Code Editor</h2>
      <form onSubmit={handleFileSubmit}>
        <label htmlFor="file">
          <input type="file" accept=".js" onChange={getFile} />
        </label>
        <input type="submit" value="Import code from js file" />
      </form>
      <form action="" onSubmit={handleSubmit}>
        <Editor
          className="Editor"
          onChange={handleChange}
          defaultLanguage="javascript"
          defaultValue="// your code here"
          onMount={handleEditorDidMount}
        />
        <input type="submit" value="Submit Code" style={{cursor: 'pointer'}} />
      </form>
    </div>
  );
}