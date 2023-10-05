import { Anchor, Group, Text } from '@mantine/core';
import { decodeGlobalID } from '@pothos/plugin-relay';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { TableActionIcon } from 'components/common/TableActionICon';
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
    <tr>
      <td>
        <Anchor href={`./detail/${databaseId}`}>
          {data.name}
        </Anchor>
      </td>
      <td>
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
      </td>
      <td style={{ whiteSpace: 'nowrap' }}>
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
      </td>
      <td>
        {data.genreSet && (
          <Anchor href={`../genreset/detail/${genreSetDatabaseId}`}>
            {data.genreSet.name}
          </Anchor>
        )}
        {!data.genreSet && (
          <Text c="dimmed">
            未割り当て
          </Text>
        )}
      </td>
      <td>
        <Group spacing={3} noWrap>
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
      </td>
    </tr>
  );
};
