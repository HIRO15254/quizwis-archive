import {
  Anchor, Group, Table, Text,
} from '@mantine/core';
import { decodeGlobalID } from '@pothos/plugin-relay';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { TableActionIcon } from 'components/parts/TableActionICon';
import { GenreSetDataFragment } from 'gql';

interface Props {
  data: GenreSetDataFragment;
  operations: {
    delete: () => void;
    update: () => void;
  }
}

export const GenreSetTableRow: React.FC<Props> = (props) => {
  const {
    data,
    operations,
  } = props;
  const { id: databaseId } = decodeGlobalID(data.id);

  return (
    <Table.Tr key={data.id}>
      <Table.Td>
        <Anchor href={`/application/genresets/${databaseId}`}>
          {data.name}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text c={!data.description ? 'dimmed' : undefined}>
          {!data.description ? '説明文はありません' : data.description}
        </Text>
      </Table.Td>
      <Table.Td>
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
      </Table.Td>
    </Table.Tr>
  );
};
