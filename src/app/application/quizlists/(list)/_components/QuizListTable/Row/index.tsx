import {
  Anchor, Group, Table, Text,
} from '@mantine/core';
import { decodeGlobalID } from '@pothos/plugin-relay';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import { TableActionIcon } from 'components/parts/TableActionICon';
import { QuizListDataFragment } from 'gql';

interface Props {
  data: QuizListDataFragment;
  operation: {
    delete: () => void;
    update: () => void;
  }
}
export const QuizListTableRow: React.FC<Props> = (props) => {
  const {
    data,
    operation,
  } = props;
  const { id: databaseId } = decodeGlobalID(data.id);
  let genreSetDatabaseId = '';
  if (data.genreSet) {
    genreSetDatabaseId = decodeGlobalID(data.genreSet.id).id;
  }
  return (
    <Table.Tr>
      <Table.Td>
        <Anchor component={Link} href={`/application/quizlists/${databaseId}`}>
          {data.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        {data.description && (
          <Text>
            {data.description}
          </Text>
        )}
        {!data.description && (
          <Text c="dimmed">
            説明文はありません
          </Text>
        )}
      </Table.Td>
      <Table.Td style={{ whiteSpace: 'nowrap' }}>
        {!!data.goal && (
          <Text>
            {`${data.quizCount}/${data.goal}`}
          </Text>
        )}
        {!data.goal && (
          <Text>
            {data.quizCount}
          </Text>
        )}
      </Table.Td>
      <Table.Td>
        {data.genreSet && (
          <Anchor href={`application/genresets/${genreSetDatabaseId}`}>
            {data.genreSet.name}
          </Anchor>
        )}
        {!data.genreSet && (
          <Text c="dimmed">
            未設定
          </Text>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap={3} wrap="nowrap">
          <TableActionIcon
            tooltip="編集"
            onClick={operation.update}
            Icon={IconPencil}
          />
          <TableActionIcon
            color="red"
            tooltip="削除"
            onClick={operation.delete}
            Icon={IconTrash}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
