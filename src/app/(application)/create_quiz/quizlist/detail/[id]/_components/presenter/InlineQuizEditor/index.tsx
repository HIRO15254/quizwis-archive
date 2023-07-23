import { Group } from '@mantine/core';
import {
  IconArrowsSplit, IconNote, IconBook2, IconCheck,
} from '@tabler/icons-react';
import React from 'react';

import { TableActionIcon } from 'components/common/TableActionICon';

import { AdditionalInfoEditIcon } from '../AdditionalInfoEditIcon';
import { ExplanationEditor } from '../Editors/ExplanationEditor';
import { GenreSelector, GenreSelectorProps } from '../Editors/GenreSelector';
import { InlineAnswerEditor } from '../Editors/InlineAnswerEditor';
import { InlineQuestionEditor } from '../Editors/InlineQuestionEditor';
import { OtherAnswerEditor } from '../Editors/OtherAnswerEditor';
import { SourceEditor } from '../Editors/SourceEditor';

import type { Editors } from '../../../_types/Editors';

export interface InlineQuizEditorProps {
  databaseId: string | null;
  editors: Editors;
  operation: {
    update: (databaseId: string) => void;
  }
  genreSelectorData: GenreSelectorProps['genres'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genreSelectorFormProps: { [key: string]: any };
}

export const InlineQuizEditor = (props: InlineQuizEditorProps) => {
  const {
    databaseId,
    editors,
    operation,
    genreSelectorData,
    genreSelectorFormProps,
  } = props;

  return (
    <>
      <td>
        <InlineQuestionEditor editor={editors.question} />
      </td>
      <td>
        <InlineAnswerEditor editor={editors.answer} />
      </td>
      <td>
        <GenreSelector genres={genreSelectorData} {...genreSelectorFormProps} />
      </td>
      <td>
        <Group spacing={3} noWrap>
          <AdditionalInfoEditIcon
            label="別解"
            editor={editors.otherAnswer}
            Icon={IconArrowsSplit}
          >
            <OtherAnswerEditor editor={editors.otherAnswer} />
          </AdditionalInfoEditIcon>
          <AdditionalInfoEditIcon
            label="解説"
            editor={editors.explanation}
            Icon={IconNote}
          >
            <ExplanationEditor editor={editors.explanation} />
          </AdditionalInfoEditIcon>
          <AdditionalInfoEditIcon
            label="出典"
            editor={editors.source}
            Icon={IconBook2}
          >
            <SourceEditor editor={editors.source} />
          </AdditionalInfoEditIcon>
        </Group>
      </td>
      <td>
        <Group spacing={3}>
          <TableActionIcon
            tooltip="確定"
            color="green"
            onClick={() => operation.update(databaseId || '')}
            Icon={IconCheck}
          />
        </Group>
      </td>
    </>
  );
};
