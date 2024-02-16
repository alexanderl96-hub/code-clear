// import Editor from "@monaco-editor/react";
// import axios from "axios";
// import {apiURL} from "../util/apiURL";
// import React, { useEffect, useState } from "react";

// export default function Display({show, input}) {
//     const API = apiURL();
//     const [fixedCode, setFixedCode] = useState(
//         "// your fixed code will show here"
//       );
//       const handleFixSubmit = (e) => {
//         e.preventDefault();
//         axios.post(`${API}/eslint/fix`, input).then((response) => {
//           setFixedCode(response.data.fixedResult[0].output);
//           console.log(fixedCode)
//         });
//       };
//   return (
//     <div className="CodeEditor2">
//         {show === "Hide" ? 
//         <form action=""  onSubmit={handleFixSubmit}>
//           <Editor
//             height="30vh"
//             className="Editor"
//             defaultLanguage="javascript"
//             value={fixedCode}
//           />
//           <input type="submit" value="Get Fixes" />
//         </form> : ""}
//     </div>
//   );
// }