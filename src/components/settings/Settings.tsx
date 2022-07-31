import React from 'react';
import { BPMSlider } from './BPMSlider';
import { AudioSettings } from './AudioSettings';
/** @jsx jsx **/
import { css } from '@emotion/react';
import { NoteSettings } from './NoteSettings';

const styles = css({
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: 8,
  border: '1px solid gray',
});

export const Settings: React.FC = () => {
  return (
    <section css={styles}>
      <h2>Settings</h2>
      <NoteSettings />
      <AudioSettings />
      <BPMSlider />
    </section>
  );
};
