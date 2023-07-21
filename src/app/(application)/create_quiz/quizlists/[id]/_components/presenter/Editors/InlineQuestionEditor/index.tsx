'use client';

import { Input } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { IconArrowRampRight } from '@tabler/icons-react';
import { BubbleMenu, Editor } from '@tiptap/react';
import React from 'react';

import { RubyControl } from 'util/tiptap/RubyControl';

interface InlineQuestionEditorProps {
  editor: Editor;
}

export const InlineQuestionEditor: React.FC<InlineQuestionEditorProps> = (props) => {
  const { editor } = props;

  return (
    <Input.Wrapper>
      <RichTextEditor
        editor={editor}
        my="0.5rem"
        labels={{
          underlineControlLabel: 'パラレル',
        }}
      >
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Underline icon={IconArrowRampRight} />
            <RubyControl />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Input.Wrapper>
  );
};
