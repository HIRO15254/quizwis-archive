import { NativeSelect, NativeSelectProps } from '@mantine/core';
import React from 'react';

interface Props extends Omit<NativeSelectProps, 'onChange'> {
  value: number;
  onChange: (newDataPerPage: number) => void;
}
export const DataPerPageSelect = (props: Props) => {
  const {
    value,
    onChange,
    ...rest
  } = props;
  return (
    <NativeSelect
      label="表示件数"
      value={value}
      onChange={(e) => onChange(Number(e.currentTarget.value))}
      style={{ width: 100 }}
      {...rest}
    />
  );
};
