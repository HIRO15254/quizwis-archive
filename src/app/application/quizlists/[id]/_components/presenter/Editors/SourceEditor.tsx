'use client';

import { Input } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';

import { RubyControl } from 'util/tiptap/RubyControl';

interface SourceEditorProps {
  editor: Editor;
}

export const SourceEditor: React.FC<SourceEditorProps> = (props) => {
  const { editor } = props;

  return (
    <Input.Wrapper>
      <RichTextEditor
        editor={editor}
        m="0.5rem"
      >
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
            <RubyControl />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
};
