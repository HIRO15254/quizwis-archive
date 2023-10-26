'use client';

import { Input } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { IconCircle, IconTriangle, IconX } from '@tabler/icons-react';
import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';

import { RubyControl } from 'util/tiptap/RubyControl';

interface OtherAnswerEditorProps {
  editor: Editor;
}

export const OtherAnswerEditor: React.FC<OtherAnswerEditorProps> = (props) => {
  const { editor } = props;

  return (
    <Input.Wrapper>
      <RichTextEditor
        editor={editor}
        m="0.5rem"
      >
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() => editor.commands.insertContent('正解: ')}
              aria-label="正解"
              title="正解"
            >
              <IconCircle size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor.commands.insertContent('もう一度: ')}
              aria-label="もう一度"
              title="もう一度"
            >
              <IconTriangle size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => editor.commands.insertContent('不正解: ')}
              aria-label="不正解"
              title="不正解"
            >
              <IconX size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
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
