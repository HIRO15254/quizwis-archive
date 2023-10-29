import { NotificationData, notifications } from '@mantine/notifications';

export const successNotification = (props: NotificationData) => {
  notifications.show({
    title: '成功',
    color: 'teal',
    ...props,
  });
};

export const errorNotification = (props: NotificationData) => {
  notifications.show({
    title: 'エラー',
    color: 'red',
    ...props,
  });
};
