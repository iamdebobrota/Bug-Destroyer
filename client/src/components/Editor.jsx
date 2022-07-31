import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ setContent }) => {
  const editor = useRef(null);
  const config = {
    removeButtons: ["source"],
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <JoditEditor
      style={{ backgroundColor: "#101010" }}
      ref={editor}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={
        (newContent) => {
          var plaintext = newContent.replace(/(<([^>]+)>)/gi, "");
          setContent(plaintext);
        } // preferred to use only this option to update the content for performance reasons
      }
      onChange={(newContent) => {}}
    />
  );
};

export default Editor;
