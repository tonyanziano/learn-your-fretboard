import React, { useCallback } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizNote } from '../../state/selectors/quiz';
import { scoreQuizGuess } from '../../state/slices/quiz';

const noteStyle = (number: number) =>
  css({
    backgroundColor: '#fff',
    borderLeft: number === 0 ? '1px solid #000' : 'none',
    borderRight: '1px solid #000',
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
  number: number;
};

export const Note: React.FC<NoteProps> = props => {
  const { note, number } = props;
  const quizNote = useSelector(selectQuizNote);
  const dispatch = useDispatch();
  const onNoteClick = useCallback(() => {
    if (note === quizNote) {
      console.log('Correct guess! :)');
    } else {
      console.log('Incorrect guess! :(');
    }
    dispatch(scoreQuizGuess(note));
  }, [dispatch, quizNote]);

  return (
    <div css={noteStyle(number)} onClick={onNoteClick}>
      <div css={stringStyle}></div>
    </div>
  );
};
