import React from 'react';
import { useCurrentNote } from '../hooks/useCurrentNote';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';

const currentNoteHeaderStyle = css({
  textAlign: 'center',
});

const currentNoteStyle = css({
  padding: '8px 0',
  textAlign: 'center',
  fontSize: 72,
});

/**
 * Displays the current note that should be played by the user
 */
export const CurrentNote: React.FC = () => {
  const currentNote = useCurrentNote();

  return (
    <>
      <h1 css={currentNoteHeaderStyle}>Play note:</h1>
      <div css={currentNoteStyle}>{currentNote}</div>
    </>
  );
};
