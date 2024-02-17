import React, { useContext, useState, useRef } from "react";
import CodeEditor from "./CodeEditor";
import Editor from "@monaco-editor/react";
import Results from "./Results";
import GuestStats from "./GuestStats";
import { apiURL } from "../server/apiURL";
import axios from "axios";
//  import logoType from '../Assets/icons/LogoMakr.png';
//  import logoType2 from '../Assets/icons/LogoMakr2.png';


// import Display from "./Display";;
import { UserContext } from "../Providers/UserProviders";
// import Display from "./Display";
// import styled, { ThemeProvider } from "styled-components";

// import { GlobalStyle, lightTheme, darkTheme } from "../styles/globalStyles";
// //import  Content  from './Components/Content.js'
// import Toggle from "../styles/toggle";
// import Containered from "./Containered";

// const Container = styled.div`
//   max-width: 100%;
//   margin: 10px auto 0;
// `;

export default function ParentComponent({ toggleLogo }) {
  const [input, setInput] = useState({ input: "// your code here" });
  const [result, setResult] = useState(["Please submit your code"]);
  const [last, setLast] = useState("");
  const [show, setShow] = useState("Fix Code");
  const API = apiURL();
  const monacoObjects = useRef(null);
  const secondEditorRef = useRef(null)
  const user = useContext(UserContext);

  const handleChange = (value, e) => {
    setInput({
      ...input,
      input: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const submission = { ...input, uid: user ? user.uid : null };
      axios.post(`${API}/eslint`, submission).then((res) => {
        setResult(res.data.result[0].messages);
      });
    } catch (c) {
      console.log("Error in ParentComponent: ", c);
    }
  };
  function handleEditorDidMount(editor, monaco) {
    monacoObjects.current = { editor, monaco };

    monaco.editor.defineTheme("TeamCodeClearDark", {
      base: "hc-black",
      colors: { "editor.background": "#2E2735" },
      inherit: true,
      rules: [],
    });
    monaco.editor.setTheme("TeamCodeClearDark");
  }
  function handleSecondEditor(editor, monaco) {
    secondEditorRef.current = { editor, monaco };

    monaco.editor.defineTheme("SecondDark", {
      base: "hc-black",
      colors: { "editor.background": "#2E2735" },
      inherit: true,
      rules: [],
    });
    monaco.editor.setTheme("SecondDark");
  }

  const handleFixSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API}/eslint/fix`, input).then((res) => {
       setLast(res.data.fixedResult[0].source);
    });
  };

  const handleErrorClick = (e) => {
    if (e.currentTarget.dataset.endColumn) {
      monacoObjects.current.editor.setSelection({
        startLineNumber: Number(e.currentTarget.dataset.line),
        startColumn: Number(e.currentTarget.dataset.column),
        endLineNumber: Number(e.currentTarget.dataset.endLine),
        endColumn: Number(e.currentTarget.dataset.endColumn),
      });
    } else {
      monacoObjects.current.editor.setSelection({
        startLineNumber: Number(e.currentTarget.dataset.line),
        startColumn: Number(e.currentTarget.dataset.column),
        endLineNumber: Number(e.currentTarget.dataset.line),
        endColumn: Number(e.currentTarget.dataset.column) + 1,
      });
    }
    monacoObjects.current.editor.focus();
  };

  const showButton = (e) => {
    if (show === "Fix Code") {
      setShow("Hide");
    } else {
      setShow("Fix Code");
    }
  };

  return (
    <div className="part">
      <div className="ParentComponent">
        <CodeEditor
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleEditorDidMount={handleEditorDidMount}
          monacoObjects={monacoObjects}
        />
        <Results
          input={input}
          result={result}
          handleErrorClick={handleErrorClick}
        />
      </div>
      <br />
      <form onSubmit={handleFixSubmit}>
        <button
          type="submit"
          value={show}
          onClick={showButton}
          className="btnbtn-primary"
        >
          {show}
        </button>
      </form>

      <div className="bothcomponent">
        {show === "Hide" && (
          <Editor
            height="300px"
            width="50%"
            defaultLanguage="javascript"
            value={last}
            className="solution"
            onMount={handleSecondEditor}
          />
        )}
        <br />
        {result[0] !== "Please submit your code" && (
          <div className="statsComponent">
            <GuestStats result={result} />
          </div>
        )}
      </div>

         {/* <img src={logoType2} alt="logo" style={{marginBottom: '20px', marginLeft: '40%',}}  className='logoType'/>
         <img src={logoType} alt="logo" style={{marginBottom: '20px', marginLeft: '40%',}}  className='logoType'/> */}

    </div>
  );
}