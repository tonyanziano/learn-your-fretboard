import React from 'react';
import { BPMSlider } from './BPMSlider';
import { AudioSettings } from './AudioSettings';
/** @jsx jsx **/
import { css } from '@emotion/react';
import { NoteSettings } from './NoteSettings';

const style = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '30px 24px',
  border: '1px solid gray',
});

const headerStyle = css({
  margin: 0,
  marginBottom: 12,
});

export const Settings: React.FC = () => {
  return (
    <section css={style}>
      <h2 css={headerStyle}>Settings</h2>
      <NoteSettings />
      <AudioSettings />
      <BPMSlider />
    </section>
  );
};
