'use client';

import { Input } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { IconArrowRampRight } from '@tabler/icons-react';
import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';

import { RubyControl } from 'util/tiptap/RubyControl';

interface InlineQuizEditorProps {
  editor: Editor;
}

export const InlineQuizEditor: React.FC<InlineQuizEditorProps> = (props) => {
  const { editor } = props;

  return (
    <Input.Wrapper>
      <RichTextEditor editor={editor} my="0.5rem">
        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold icon={IconArrowRampRight} />
              <RichTextEditor.Link />
              <RubyControl />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}
        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
};
