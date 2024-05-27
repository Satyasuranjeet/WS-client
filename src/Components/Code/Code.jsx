import { CopyBlock } from 'react-code-blocks';
import './Codex.css'; // Import the CSS file for Codex component

export const Codex = (props) => {
  return (
    <CopyBlock
      text={props.code}
      language={props.language}
      showLineNumbers={props.showLineNumbers}
      wrapLines
      className="codex" // Add a class name for styling
    />
  );
};
