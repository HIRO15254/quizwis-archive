/* eslint-disable react/no-danger */
import {
  TableTrProps, Group, Table, Text,
} from '@mantine/core';
import {
  IconArrowsSplit, IconBook2, IconNote, IconPencil, IconTrash,
} from '@tabler/icons-react';
import React from 'react';

import { GenreBadge } from 'components/parts/GenreBadge';
import { TableActionIcon } from 'components/parts/TableActionICon';
import { QuizDataFragment } from 'gql';

import { AdditionalInfoIcon } from '../AdditionalInfoIcon';

interface Props extends TableTrProps {
  data: QuizDataFragment;
  operations: {
    update: (databaseId: string) => void;
    delete: (databaseId: string) => void;
  }
}

export const QuizTableRow: React.FC<Props> = (props) => {
  const {
    data,
    operations,
    ...rest
  } = props;

  return (
    <Table.Tr
      {...rest}
    >
      <Table.Td>
        <div dangerouslySetInnerHTML={{ __html: data.question ?? '' }} />
      </Table.Td>
      <Table.Td>
        {data.length}
      </Table.Td>
      <Table.Td>
        <div dangerouslySetInnerHTML={{ __html: data.answer ?? '' }} />
      </Table.Td>
      <Table.Td>
        {data.genre && (
          <GenreBadge color={data.genre.color ?? 'gray'}>
            {data.genre.name}
          </GenreBadge>
        )}
        {!data.genre && (
          <Text c="dimmed">未設定</Text>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap={3} wrap="nowrap">
          <AdditionalInfoIcon tooltipLabel="別解" data={data.otherAnswer} Icon={IconArrowsSplit} />
          <AdditionalInfoIcon tooltipLabel="解説" data={data.explanation} Icon={IconNote} />
          <AdditionalInfoIcon tooltipLabel="出典" data={data.source} Icon={IconBook2} />
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap={3} wrap="nowrap">
          <TableActionIcon
            tooltip="編集"
            Icon={IconPencil}
            onClick={() => operations.update(data.id)}
          />
          <TableActionIcon
            tooltip="削除"
            Icon={IconTrash}
            onClick={() => operations.delete(data.id)}
            color="red"
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
