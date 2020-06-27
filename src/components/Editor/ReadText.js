import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import './css/example.css';
import './css/draft.css';
import './css/rich-editor-readonly.css';

const { useRef } = React;
const linkifyPlugin = createLinkifyPlugin();

function ReadText(props) {
  const editor = useRef(null);

  

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  // let className = 'RichEditor-editor';
  let className = '';
  var contentState = props.editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== 'unstyled'
    ) {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className="RichEditor-root-readOnly">
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={props.editorState}
          placeholder="No Description"
          onChange={props.setEditorState}
          ref={editor}
          readOnly={true}
          plugins={[linkifyPlugin]}
        />
      </div>
    </div>
  );
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

export default ReadText;