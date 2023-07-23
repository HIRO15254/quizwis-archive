'use client';

import { Text } from '@mantine/core';
import React from 'react';

import { ConfirmModal, ConfirmModalProps } from 'components/common/ConfirmModal';
// 各種import

/**
 * クイズリストを削除するためのモーダル
 */
export const DeleteQuizModal: React.FC<ConfirmModalProps> = (props) => (
  <ConfirmModal {...props}>
    <Text>
      この問題を削除しますか？
      <br />
      削除した問題は復元できません。
    </Text>
  </ConfirmModal>
);
