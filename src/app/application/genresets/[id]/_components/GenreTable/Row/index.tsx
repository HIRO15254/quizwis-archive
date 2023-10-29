import { Group, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { GenreBadge } from 'components/parts/GenreBadge';
import { TableActionIcon } from 'components/parts/TableActionICon';

import { GenreTree } from '../../../_util/genreListToTree';

interface Props {
  genre: GenreTree;
  nest: number;
  operations: {
    create: (parentId?: string) => void;
    update: (databaseId: string) => void;
    delete: (databaseId: string) => void;
  }
}

export const GenreTableRow: React.FC<Props> = (props) => {
  const {
    genre,
    nest,
    operations,
  } = props;
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Table.Tr>
        <Table.Td style={{ paddingLeft: nest * 20 }}>
          <Group wrap="nowrap">
            <IconPlus
              onClick={toggle}
              style={{ visibility: genre.children.length === 0 ? 'hidden' : undefined }}
            />
            <GenreBadge color={genre.data.color ?? 'gray'}>
              {genre.data.name}
            </GenreBadge>
          </Group>
        </Table.Td>
        <Table.Td>
          {genre.data.description ? (
            <Text>{genre.data.description}</Text>
          ) : (
            <Text c="dimmed">説明文なし</Text>
          )}
        </Table.Td>
        <Table.Td style={{ whiteSpace: 'nowrap' }}>
          <Group wrap="nowrap">
            <Text fw="bold">{genre.data.ratio}</Text>
            <Text fz="xs">
              { nest === 0 && (
                `(${genre.data.ratioPercent.toFixed(2)}%)`
              )}
              { nest !== 0 && (
                `(${genre.data.ratioPercent.toFixed(2)}%/${genre.data.allRatioPercent.toFixed(2)}%)`
              )}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Group gap={2} wrap="nowrap">
            <TableActionIcon
              tooltip="サブジャンルを追加"
              onClick={() => operations.create(genre.data.id)}
              Icon={IconPlus}
            />
            <TableActionIcon
              tooltip="編集"
              onClick={() => operations.update(genre.data.id)}
              Icon={IconPencil}
            />
            <TableActionIcon
              tooltip="削除"
              color="red"
              onClick={() => operations.delete(genre.data.id)}
              Icon={IconTrash}
            />
          </Group>
        </Table.Td>
      </Table.Tr>
      {opened && genre.children.map((child) => (
        <GenreTableRow
          key={child.data.id}
          genre={child}
          nest={nest + 1}
          operations={operations}
        />
      ))}
    </>
  );
};
