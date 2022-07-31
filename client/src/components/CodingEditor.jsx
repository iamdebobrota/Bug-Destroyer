import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";

const CodingEditor = ({ setCode }) => {
  return (
    <CodeEditor
      language="js"
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
};

export default CodingEditor;
