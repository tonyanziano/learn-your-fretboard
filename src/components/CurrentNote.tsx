import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { selectCurrentNote } from '../state/selectors/currentNote';
import { generateCurrentNote } from '../hooks/generateCurrentNote';

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
  const { note: currentNote } = useSelector(selectCurrentNote);
  generateCurrentNote();

  return (
    <>
      <h1 css={currentNoteHeaderStyle}>Play note:</h1>
      <div css={currentNoteStyle}>{currentNote}</div>
    </>
  );
};
