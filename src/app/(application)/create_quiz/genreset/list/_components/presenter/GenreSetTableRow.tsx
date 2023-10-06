import { Anchor, Group, Text } from '@mantine/core';
import { decodeGlobalID } from '@pothos/plugin-relay';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { TableActionIcon } from 'components/common/TableActionICon';
import { GenreSetDataFragment } from 'gql';

interface GenreSetTableRowProps {
  data: GenreSetDataFragment;
  operations: {
    delete: () => void;
    update: () => void;
  }
}

export const GenreSetTableRow: React.FC<GenreSetTableRowProps> = (props) => {
  const {
    data,
    operations,
  } = props;
  const { id: databaseId } = decodeGlobalID(data.id);

  return (
    <tr key={data.id}>
      <td>
        <Anchor href={`./detail/${databaseId}`}>
          {data.name}
        </Anchor>
      </td>
      <td>
        { data.description
          && (
            <Text>
              {data.description}
            </Text>
          )}
        { !data.description
          && (
            <Text c="dimmed">
              説明文はありません
            </Text>
          )}
      </td>
      <td>
        <Group gap={3} wrap="nowrap">
          <TableActionIcon
            tooltip="編集"
            onClick={() => operations.update()}
            Icon={IconPencil}
          />
          <TableActionIcon
            tooltip="削除"
            color="red"
            onClick={() => operations.delete()}
            Icon={IconTrash}
          />
        </Group>
      </td>
    </tr>
  );
};
