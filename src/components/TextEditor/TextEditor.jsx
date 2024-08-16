import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
// ----------------------------------------------------------------------------

const TextEditor = ({ sendContent, onChange }) => {
  const editor = useRef(null);
  const [content, setContent] = useState(
    sendContent ? sendContent : ''
  );

 

  // content value
  useEffect(() => {
    if (content) {
     
      onChange(content);
    }
  }, [content]);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => {
        //   setContent(newContent);
        // }}
        config={{ theme: "dark" }}

      />
    </div>
  );
};

export default TextEditor;