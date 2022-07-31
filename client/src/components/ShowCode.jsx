import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import { dark, dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const ShowCode = ({ code }) => {
  const codeString = code;
  return (
    <SyntaxHighlighter language="javascript" style={dracula}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default ShowCode;
