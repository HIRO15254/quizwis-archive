'use client';

import { UseFormReturnType } from '@mantine/form';
import { RichTextEditor } from '@mantine/tiptap';
import { IconArrowRampRight } from '@tabler/icons-react';
import { BubbleMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import { Rt } from 'util/tiptap/ruby';

interface InlineQuizEditorProps {
  form: UseFormReturnType<any>;
}

export const InlineQuizEditor: React.FC<InlineQuizEditorProps> = (props) => {
  const { form } = props;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Rt,
    ],
    content: form.getInputProps('question').value,
  });

  return (
    <RichTextEditor editor={editor} m="xs">
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold icon={IconArrowRampRight} />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
