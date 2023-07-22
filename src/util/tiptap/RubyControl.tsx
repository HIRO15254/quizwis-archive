import {
  Button, Group, Popover, TextInput,
} from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconLanguageHiragana } from '@tabler/icons-react';
import React from 'react';

interface FormUsingRubyProps {
  text: string;
}

interface RubyFormProps {
  form: UseFormReturnType<FormUsingRubyProps>;
  onSubmit: () => void;
  target: string;
}

export const RubyForm: React.FC<RubyFormProps> = (props) => {
  const { form, onSubmit, target } = props;
  return (
    <form onSubmit={onSubmit}>
      <Group spacing={0}>
        <TextInput
          placeholder={target}
          {...form.getInputProps('text')}
        />
        <Button type="submit">挿入</Button>
      </Group>
    </form>
  );
};

export const RubyControl = () => {
  const { editor } = useRichTextEditorContext();

  const [opened, { close, open }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      text: '',
    },
  });

  const onSubmit = form.onSubmit((values) => {
    editor.commands.setRuby({ text: values.text });
    close();
    form.reset();
  });

  const selectedText = () => {
    const { state } = editor;
    const { from, to } = state.selection;
    return state.doc.textBetween(from, to);
  };

  return (
    <Popover trapFocus position="top" opened={opened}>
      <Popover.Target>
        <RichTextEditor.Control
          title="ルビの挿入"
          onClick={open}
        >
          <IconLanguageHiragana size="1.3rem" stroke={1.5} />
        </RichTextEditor.Control>
      </Popover.Target>
      <Popover.Dropdown>
        <RubyForm
          form={form}
          onSubmit={onSubmit}
          target={selectedText()}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
