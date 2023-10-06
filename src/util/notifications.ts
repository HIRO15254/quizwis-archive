import { showNotification, NotificationData } from '@mantine/notifications';

export const successNotification = (props: NotificationData) => {
  showNotification({
    title: '成功',
    color: 'teal',
    ...props,
  });
};

export const errorNotification = (props: NotificationData) => {
  showNotification({
    title: 'エラー',
    color: 'red',
    ...props,
  });
};
