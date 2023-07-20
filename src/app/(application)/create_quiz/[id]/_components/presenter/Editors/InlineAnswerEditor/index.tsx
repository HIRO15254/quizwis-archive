'use client';

import { Input } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';

import { RubyControl } from 'util/tiptap/RubyControl';

interface InlineAnswerEditorProps {
  editor: Editor;
}

export const InlineAnswerEditor: React.FC<InlineAnswerEditorProps> = (props) => {
  const { editor } = props;

  return (
    <Input.Wrapper>
      <RichTextEditor
        editor={editor}
        my="0.5rem"
      >
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RubyControl />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
};
