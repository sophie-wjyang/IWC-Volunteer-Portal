import React from 'react';
import {Editor, RichUtils, getDefaultKeyBinding} from 'draft-js';

import './css/example.css';
import './css/draft.css';
import './css/rich-editor.css';

const { useRef, useCallback} = React;

function ReadText(props) {
  const editor = useRef(null);

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        props.setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    [props],
  );

  const mapKeyToEditorCommand = useCallback(
    e => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            props.editorState,
            4 /* maxDepth */,
          );
          if (newEditorState !== props.editorState) {
            props.setEditorState(newEditorState);
          }
          return null;
        default:
          return getDefaultKeyBinding(e);
      }
    },
    [props],
  );

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
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
    <div className="RichEditor-root">
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={props.editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={props.setEditorState}
          placeholder="Description"
          ref={editor}
          spellCheck={true}
          readOnly={props.readOnly}
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