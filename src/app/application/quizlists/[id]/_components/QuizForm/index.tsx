import { Flex, Input } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { Underline } from '@tiptap/extension-underline';
import { EditorOptions, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import React from 'react';

import { GenreDataFragment, QuizInputData } from 'gql';
import { Ruby } from 'util/tiptap/ruby';

interface Props {
  form: UseFormReturnType<QuizInputData>
}

export const QuizForm: React.FC<Props> = (props) => {
  const {
    form,
  } = props;

  const editorOptions: Partial<EditorOptions> = {
    extensions: [
      StarterKit,
      Ruby,
      Link,
      Underline,
    ],
    editorProps: {
      attributes: {
        style: 'padding: 0.5rem',
      },
    },
  };

  const questionEditor = useEditor(editorOptions);
  const answerEditor = useEditor(editorOptions);

  return (
    <>
      <Input.Wrapper
        label="問題文"
        withAsterisk
        error={form.errors.question}
        inputWrapperOrder={['label', 'error', 'input', 'description']}
      >
        <RichTextEditor
          editor={questionEditor}
          {...form.getInputProps('question')}
        >
          <RichTextEditor.Content />
        </RichTextEditor>
        <Flex justify="flex-end">
          <Input.Description>
            {`${questionEditor?.getText().length ?? 0}文字`}
          </Input.Description>
        </Flex>
      </Input.Wrapper>
      <Input.Wrapper
        label="解答"
        withAsterisk
        error={form.errors.answer}
      >
        <RichTextEditor
          editor={answerEditor}
          {...form.getInputProps('answer')}
        >
          <RichTextEditor.Content />
        </RichTextEditor>
      </Input.Wrapper>

    </>
  );
};
