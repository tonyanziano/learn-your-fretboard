import React, { useCallback, useMemo } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { String } from './String';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectQuizIsStarted,
  selectQuizNote,
  selectQuizScore,
} from '../../state/selectors/quiz';
import { getUniqueNote } from '../../utils/getUniqueNote';
import { AccidentalNotes, NaturalNotes } from '../../constants';
import { setQuizIsStarted, setQuizNote } from '../../state/slices/quiz';

const quizContainerStyle = css({
  padding: 16,
});

const diagramGridStyle = css({
  backgroundColor: '#fff',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', // 12 columns; one for each fret
  gridTemplateRows: 'auto 48px 48px 48px 48px 48px 48px 30px', // fret numbers, string 1, 2, 3, 4, 5, 6, bottom padding
  height: 'auto',
  minWidth: 660,
  padding: '0 16px',
  position: 'relative',
});

const bottomStyle = css({
  borderTop: '1px solid #000',
  gridColumn: '1 / 13',
  gridRow: 8,
});

const fretNumberStyle = css({
  color: '#000',
  borderBottom: '1px solid #000',
  paddingTop: 24,
  paddingBottom: 12,
  textAlign: 'center',
  gridRow: 1,
});

const startButtonStyle = css({
  margin: '16px 0',
  appearance: 'none',
  backgroundColor: '#2e2d2d',
  border: '1px solid #ccc',
  borderRadius: 4,
  padding: '6px 16px',
  color: '#ccc',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#1f1e1e',
    color: '#fff',
  },
});

const noteDisplayStyle = css({
  display: 'block',
  height: 48,
  lineHeight: '48px',
  fontSize: 36,
});

const scoreStyle = css({
  display: 'block',
  height: 48,
  lineHeight: '48px',
  fontSize: 22,
  width: '100%',
});

// const inlayStyle = css({
//   position: 'absolute',
//   width: 16,
//   height: 16,
//   borderRadius: 16,
//   backgroundColor: '#000',

//   gridRow: 4,
//   gridColumn: 3,

//   alignSelf: 'center',
//   justifySelf: 'center',
// });

const allNotes = [...NaturalNotes, ...AccidentalNotes];

const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
const notesPerString = [
  // high E
  ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
  ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
  ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
  ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
  // low E
  ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
];
const getNotesForString = (stringNum: number) => notesPerString[stringNum];
const fretNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const FretboardQuiz: React.FC = () => {
  const quizNote = useSelector(selectQuizNote);
  const { correctGuesses, totalGuesses } = useSelector(selectQuizScore);
  const quizStarted = useSelector(selectQuizIsStarted);
  const dispatch = useDispatch();

  const onStartClick = useCallback(() => {
    dispatch(setQuizIsStarted(true));
    dispatch(setQuizNote(getUniqueNote(allNotes, quizNote)));
  }, [dispatch, quizNote]);

  const onStopClick = useCallback(() => {
    dispatch(setQuizIsStarted(false));
    dispatch(setQuizNote(''));
  }, [dispatch]);

  const scoreText = useMemo(() => {
    if (!quizStarted) {
      return 'Click "Start Quiz" to begin';
    }
    return totalGuesses === 0
      ? 'Score: No guesses yet'
      : `Score: ${correctGuesses} / ${totalGuesses}`;
  }, [correctGuesses, quizStarted, totalGuesses]);

  return (
    <div css={quizContainerStyle}>
      {quizStarted ? (
        <button css={startButtonStyle} onClick={onStopClick}>
          Stop Quiz
        </button>
      ) : (
        <button css={startButtonStyle} onClick={onStartClick}>
          Start Quiz
        </button>
      )}
      <span css={noteDisplayStyle}>
        {quizNote ? `Where can you find: ${quizNote}?` : ''}
      </span>
      <span css={scoreStyle}>{scoreText}</span>
      <div css={diagramGridStyle}>
        {fretNumbers.map(fNum => (
          <div css={fretNumberStyle} key={`fret-number-${fNum}`}>
            {fNum}
          </div>
        ))}
        {strings.map((_s, sNum) => {
          const notes = getNotesForString(sNum);
          return <String key={`string-${sNum}`} notes={notes} number={sNum} />;
        })}
        <div css={bottomStyle} key={'bottom-padding'}></div>
        {/* <div css={inlayStyle}></div> */}
      </div>
    </div>
  );
};
