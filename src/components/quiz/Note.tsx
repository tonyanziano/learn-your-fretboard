import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';

const noteStyle = css({
  backgroundColor: '#fff',
  borderLeft: '1px solid #000',
  cursor: 'pointer',
  position: 'relative',

  ':hover': {
    backgroundColor: '#ccc',
  },
});

const stringStyle = css({
  position: 'absolute',
  backgroundColor: '#000',
  height: 2,
  width: '100%',
  left: 0,
  top: 'calc(50% - 1px)',
});

type NoteProps = {
  note: string;
};

export const Note: React.FC<NoteProps> = props => {
  const { note } = props;

  return (
    <div css={noteStyle}>
      {note}
      <div css={stringStyle}></div>
    </div>
  );
};
