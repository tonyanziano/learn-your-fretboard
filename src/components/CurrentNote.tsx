import React from 'react';
import { useCurrentNote } from '../hooks/useCurrentNote';
/** @jsx jsx **/
import { css } from '@emotion/react';

const styles = css({
  padding: '8px 0',
  textAlign: 'center',
  fontSize: 72,
});

/**
 * Displays the current note that should be played by the user
 */
export const CurrentNote: React.FC = () => {
  const currentNote = useCurrentNote();

  return <div css={styles}>{currentNote}</div>;
};
