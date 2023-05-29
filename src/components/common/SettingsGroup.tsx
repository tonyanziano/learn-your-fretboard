import React, { useMemo } from 'react';

/** @jsx jsx **/
import { css } from '@emotion/react';

const radioGroupStyle = css({
  padding: 8,
  margin: 0,
  marginBottom: 20,
  border: '1px solid #82807f',
  borderRadius: 4,
});

let idSuffix = 0;

type SettingsGroupProps = {
  label: string;
};

export const SettingsGroup: React.FC<
  React.PropsWithChildren<SettingsGroupProps>
> = props => {
  const { children, label } = props;

  const id = useMemo(() => `settings-group-${idSuffix++}`, []);

  return (
    <div aria-labelledby={id} css={radioGroupStyle}>
      <label id={id}>{label}</label>
      {children}
    </div>
  );
};
