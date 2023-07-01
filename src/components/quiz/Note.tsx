import React, { useCallback } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizNote } from '../../state/selectors/quiz';
import { scoreQuizGuess } from '../../state/slices/quiz';

const noteStyle = css({
  backgroundColor: '#fff',
  borderLeft: '1px solid #000',
  cursor: 'pointer',
  position: 'relative',

  ':hover': {
    backgroundColor: '#78c8eb',
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
  const quizNote = useSelector(selectQuizNote);
  const dispatch = useDispatch();
  const onNoteClick = useCallback(() => {
    if (note === quizNote) {
      console.log('CORRECT!');
    } else {
      console.log('INCORRECT!');
    }
    dispatch(scoreQuizGuess(note));
  }, [dispatch, quizNote]);

  return (
    <div css={noteStyle} onClick={onNoteClick}>
      {note}
      <div css={stringStyle}></div>
    </div>
  );
};
