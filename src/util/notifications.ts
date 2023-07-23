import { showNotification, NotificationProps } from '@mantine/notifications';

export const successNotification = (props: NotificationProps) => {
  showNotification({
    title: '成功',
    color: 'teal',
    ...props,
  });
};

export const errorNotification = (props: NotificationProps) => {
  showNotification({
    title: 'エラー',
    color: 'red',
    ...props,
  });
};
