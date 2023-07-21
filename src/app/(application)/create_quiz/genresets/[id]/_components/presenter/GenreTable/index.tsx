// "use client";

// 各種import
import {
  ActionIcon,
  Badge,
  Button, Group, Skeleton, Stack, Table, Text, Tooltip, useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react';

import { GenreTree } from '../../../_util/genreListToTree';

// Propsの型定義
interface GenreRowProps {
  genre: GenreTree;
  nest: number;
  openCreateGenreModal: (parentId?: string) => void;
  openDeleteGenreModal: (databaseId: string) => void;
  openUpdateGenreModal: (databaseId: string) => void;
}

const GenreRow: React.FC<GenreRowProps> = (props) => {
  const {
    genre,
    nest,
    openCreateGenreModal,
    openDeleteGenreModal,
    openUpdateGenreModal,
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
          <Group>
            <IconPlus
              onClick={toggle}
              style={{ visibility: genre.children.length === 0 ? 'hidden' : undefined }}
            />
            <Badge color={genre.data.color ?? 'gray'} variant="light" size="lg">
              {genre.data.name}
            </Badge>
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
          <Group spacing={2}>
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
            <Tooltip label="編集">
              <ActionIcon
                variant="subtle"
                color="blue"
                size="lg"
                onClick={() => openUpdateGenreModal(genre.data.databaseId)}
              >
                <IconPencil />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="削除">
              <ActionIcon
                variant="subtle"
                color="red"
                size="lg"
                onClick={() => openDeleteGenreModal(genre.data.databaseId)}
              >
                <IconTrash />
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
          openDeleteGenreModal={openDeleteGenreModal}
          openUpdateGenreModal={openUpdateGenreModal}
        />
      ))}
    </>
  );
};

interface GenreTableProps {
  data: GenreTree[];
  openCreateGenreModal: (parentId?: string) => void;
  openDeleteGenreModal: (databaseId: string) => void;
  openUpdateGenreModal: (databaseId: string) => void;
  loading: boolean;
}

/**
 * 説明
 */
export const GenreTable: React.FC<GenreTableProps> = (props) => {
  const {
    data,
    openCreateGenreModal,
    openDeleteGenreModal,
    openUpdateGenreModal,
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
          新規ジャンル
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
            <th style={{ width: 60 }}>比率</th>
            <th style={{ width: 130 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((genre) => (
            <GenreRow
              key={genre.data.id}
              genre={genre}
              nest={0}
              openCreateGenreModal={openCreateGenreModal}
              openDeleteGenreModal={openDeleteGenreModal}
              openUpdateGenreModal={openUpdateGenreModal}
            />
          ))}
        </tbody>
      </Table>
    </Skeleton>
  );
};
