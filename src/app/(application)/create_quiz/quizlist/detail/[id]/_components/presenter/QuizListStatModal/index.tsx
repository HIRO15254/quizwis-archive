'use client';

import {
  Group,
  Modal, Progress, RingProgress, ScrollArea, Table, Tabs, Text, Transition, useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { GenreBadge } from 'components/common/GenreBadge';

interface QuizListStatModalGenre {
  data : {
    name: string;
    color: string;
    count: number;
    allRatioPercent: number;
  }
  children: QuizListStatModalGenre[];
}

// Propsの型定義
interface QuizListStatModalProps {
  data: {
    genres: QuizListStatModalGenre[];
    goal: number;
    quizCount: number;
  }
  opened: boolean;
  close: () => void;
}

interface QuizListStatModalTableRowProps {
  genre: QuizListStatModalGenre;
  goal: number;
  nest: number;
  style?: React.CSSProperties;
}

const QuizListStatModalTableRow = (props: QuizListStatModalTableRowProps) => {
  const {
    genre, goal, style, nest,
  } = props;

  const [opened, handlers] = useDisclosure();

  const goalCount = (genre.data.allRatioPercent / 100) * goal;
  const goalPercent = (genre.data.count / goalCount) * 100;

  const theme = useMantineTheme();

  return (
    <>
      <tr key={genre.data.name} style={{ ...style }}>
        <td>
          <Group noWrap style={{ marginLeft: nest * 15 }}>
            <IconPlus
              onClick={handlers.toggle}
              style={{ visibility: !genre.children.length ? 'hidden' : undefined }}
            />
            <GenreBadge color={genre.data.color}>
              {genre.data.name}
            </GenreBadge>
          </Group>
        </td>
        <td style={{ whiteSpace: 'nowrap' }}>
          <Text fz="lg">
            {`${genre.data.count}/${goalCount.toFixed(0)}`}
            <Text fz="xs" span>{`.${(goalCount % 1).toFixed(2).slice(2)}`}</Text>
            問
          </Text>
        </td>
        <td>
          <Progress
            color={(genre.data.color === 'gray' && theme.colorScheme === 'dark') ? 'dark' : genre.data.color}
            size="xl"
            value={goalPercent}
          />
        </td>
      </tr>
      {genre.children.length > 0 && (
        <Transition mounted={opened} transition="scale-y" duration={200} timingFunction="ease">
          {(styles) => (
            <>
              {genre.children.map((child) => (
                <QuizListStatModalTableRow
                  genre={child}
                  goal={goal}
                  style={styles}
                  nest={nest + 1}
                />
              ))}
            </>
          )}
        </Transition>
      )}
    </>
  );
};

/**
 * 説明
 */
export const QuizListStatModal: React.FC<QuizListStatModalProps> = (props) => {
  const {
    data,
    opened,
    close: onClose,
  } = props;

  const theme = useMantineTheme();

  const colorCounter: { [key: string]: number } = {};
  const sections = data.genres.map((genre) => {
    if (colorCounter[genre.data.color] === undefined) {
      colorCounter[genre.data.color] = 0;
    }
    colorCounter[genre.data.color] += 1;
    return {
      value: data.goal !== 0
        ? (genre.data.count / Math.max(data.quizCount, data.goal)) * 100
        : (genre.data.count / data.quizCount) * 100,
      color: (genre.data.color === 'gray' && theme.colorScheme === 'dark')
        ? theme.colors.dark[10 - colorCounter[genre.data.color] * 2]
        : theme.colors[genre.data.color][10 - colorCounter[genre.data.color] * 2],
      tooltip: `${genre.data.name}: ${genre.data.count}問`,
    };
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fz="xl">問題リスト統計</Text>}
      size="auto"
      mah={0.5}
    >
      <Tabs defaultValue="overall">
        <Tabs.List>
          <Tabs.Tab value="overall">概要</Tabs.Tab>
          {(data.quizCount !== 0) && <Tabs.Tab value="genre">ジャンル集計</Tabs.Tab>}
        </Tabs.List>
        <Tabs.Panel value="overall">
          {(data.quizCount === 0) && (
            <RingProgress
              sections={sections}
              label={(
                <Text size="lg" align="center" sx={{ pointerEvents: 'none' }}>
                  作成済
                  <br />
                  {`${data.quizCount}問`}
                </Text>
              )}
              size={400}
              thickness={60}
            />
          )}
          {(data.quizCount !== 0) && (
            <RingProgress
              sections={sections}
              label={(
                <Text size="lg" align="center" sx={{ pointerEvents: 'none' }}>
                  作成済/目標
                  <br />
                  {`${data.quizCount}問/${data.goal}問`}
                  <br />
                  {`${((data.quizCount / data.goal) * 100).toFixed(1)}%`}
                </Text>
              )}
              size={400}
              thickness={60}
            />
          )}
        </Tabs.Panel>
        <Tabs.Panel value="genre">
          <ScrollArea.Autosize mah="80vm" m="md" w="45rem">
            <Table>
              <thead>
                <tr>
                  <th>ジャンル</th>
                  <th>問題数/目標数</th>
                  <th style={{ width: '50%' }}>完成度</th>
                </tr>
              </thead>
              <tbody>
                {data.genres.map((genre) => (
                  <QuizListStatModalTableRow
                    genre={genre}
                    goal={data.goal}
                    nest={0}
                  />
                ))}
              </tbody>
            </Table>
          </ScrollArea.Autosize>
        </Tabs.Panel>
      </Tabs>
    </Modal>

  );
};
