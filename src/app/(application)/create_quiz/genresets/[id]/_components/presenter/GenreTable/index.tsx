// "use client";

// 各種import
import {
  ActionIcon,
  Button, Group, Skeleton, Stack, Table, Text, Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { GenreTree } from '../../../_util/genreListToTree';

// Propsの型定義
interface GenreRowProps {
  genre: GenreTree;
  nest: number;
  openCreateGenreModal: (parentId?: string) => void;
}

const GenreRow: React.FC<GenreRowProps> = (props) => {
  const {
    genre,
    nest,
    openCreateGenreModal,
  } = props;
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <tr>
        <td style={{ paddingLeft: nest * 20 }}>
          <Group>
            <IconPlus
              onClick={toggle}
              style={{ visibility: genre.children.length === 0 ? 'hidden' : undefined }}
            />
            {genre.data.name}
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
          <Group>
            <Tooltip label="サブジャンルを追加">
              <ActionIcon
                variant="subtle"
                color="blue"
                size="lg"
                onClick={() => openCreateGenreModal(genre.data.databaseId)}
              >
                <IconPlus />
              </ActionIcon>
            </Tooltip>
          </Group>
        </td>
      </tr>
      {opened && genre.children.map((child) => (
        <GenreRow
          key={child.data.id}
          genre={child}
          nest={nest + 1}
          openCreateGenreModal={openCreateGenreModal}
        />
      ))}
    </>
  );
};

interface GenreTableProps {
  data: GenreTree[];
  openCreateGenreModal: (parentId?: string) => void;
  loading: boolean;
}

/**
 * 説明
 */
export const GenreTable: React.FC<GenreTableProps> = (props) => {
  const {
    data,
    openCreateGenreModal,
    loading,
  } = props;

  // reactのhookの宣言
  // 実際のコンポーネント
  if (data.length === 0 && !loading) {
    return (
      <Stack align="center" m="sm">
        <Text size="lg">ジャンルがありません</Text>
        <Button
          onClick={() => openCreateGenreModal()}
          leftIcon={<IconPlus />}
        >
          新規ジャンルセット
        </Button>
      </Stack>
    );
  }
  return (
    <Skeleton visible={loading}>
      <Group position="right" pb="sm">
        <Button
          onClick={() => openCreateGenreModal()}
          leftIcon={<IconPlus />}
        >
          ジャンルを追加
        </Button>
      </Group>
      <Table>
        <thead>
          <tr>
            <th>ジャンル名</th>
            <th>説明</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((genre) => (
            <GenreRow
              key={genre.data.id}
              genre={genre}
              nest={0}
              openCreateGenreModal={openCreateGenreModal}
            />
          ))}
        </tbody>
      </Table>
    </Skeleton>
  );
};
