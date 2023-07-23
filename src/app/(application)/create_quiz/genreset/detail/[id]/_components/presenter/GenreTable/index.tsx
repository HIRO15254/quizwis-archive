// "use client";

// 各種import
import {
  Button, Group, Skeleton, Stack, Table, Text, useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { GenreBadge } from 'components/common/GenreBadge';
import { TableActionIcon } from 'components/common/TableActionICon';

import { GenreTree } from '../../../_util/genreListToTree';

interface GenreRowProps {
  genre: GenreTree;
  nest: number;
  operations: {
    create: (parentId?: string) => void;
    update: (databaseId: string) => void;
    delete: (databaseId: string) => void;
  }
}

const GenreRow: React.FC<GenreRowProps> = (props) => {
  const {
    genre,
    nest,
    operations,
  } = props;
  const [opened, { toggle }] = useDisclosure(false);
  const theme = useMantineTheme();

  const bgColor = () => {
    if (theme.colorScheme === 'dark') {
      return theme.colors.dark[7 - nest];
    }
    if (nest === 0) {
      return theme.white;
    }
    return theme.colors.gray[nest - 1];
  };

  return (
    <>
      <tr style={{ backgroundColor: bgColor() }}>
        <td style={{ paddingLeft: nest * 20 }}>
          <Group noWrap>
            <IconPlus
              onClick={toggle}
              style={{ visibility: genre.children.length === 0 ? 'hidden' : undefined }}
            />
            <GenreBadge color={genre.data.color}>
              {genre.data.name}
            </GenreBadge>
          </Group>
        </td>
        <td>
          {genre.data.description ? (
            <Text>{genre.data.description}</Text>
          ) : (
            <Text c="dimmed">説明文なし</Text>
          )}
        </td>
        <td>
          <Text>{genre.data.ratio}</Text>
        </td>
        <td>
          <Group spacing={2} noWrap>
            <TableActionIcon
              tooltip="サブジャンルを追加"
              onClick={() => operations.create(genre.data.databaseId)}
              Icon={IconPlus}
            />
            <TableActionIcon
              tooltip="編集"
              onClick={() => operations.update(genre.data.databaseId)}
              Icon={IconPencil}
            />
            <TableActionIcon
              tooltip="削除"
              color="red"
              Icon={IconTrash}
            />
          </Group>
        </td>
      </tr>
      {opened && genre.children.map((child) => (
        <GenreRow
          key={child.data.id}
          genre={child}
          nest={nest + 1}
          operations={operations}
        />
      ))}
    </>
  );
};

interface GenreTableProps {
  data: GenreTree[];
  loading: boolean;
  operations: {
    create: (parentId?: string) => void;
    update: (databaseId: string) => void;
    delete: (databaseId: string) => void;
  }
}

/**
 * ジャンル一覧ページのテーブル
 */
export const GenreTable: React.FC<GenreTableProps> = (props) => {
  const {
    data,
    loading,
    operations,
  } = props;

  // reactのhookの宣言
  // 実際のコンポーネント
  if (data.length === 0 && !loading) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">ジャンルがありません</Text>
        <Button
          onClick={() => operations.create()}
          leftIcon={<IconPlus />}
        >
          新規ジャンル
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Group position="right" pb="sm">
        <Button
          onClick={() => operations.create()}
          leftIcon={<IconPlus />}
        >
          ジャンルを追加
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th style={{ width: 'fix-content' }}>ジャンル名</th>
            <th>説明</th>
            <th style={{ width: 0, whiteSpace: 'nowrap' }}>比率</th>
            <th style={{ width: 0 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((genre) => (
            <GenreRow
              key={genre.data.id}
              genre={genre}
              nest={0}
              operations={operations}
            />
          ))}
        </tbody>
      </Table>
    </Skeleton>
  );
};
