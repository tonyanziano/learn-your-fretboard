import React, { useCallback } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { String } from './String';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizNote } from '../../state/selectors/currentNote';
import { getUniqueNote } from '../../hooks/getUniqueNote';
import { AccidentalNotes, NaturalNotes } from '../../constants';
import { setQuizNote } from '../../state/slices/currentNote';

const containerStyle = css({
  backgroundColor: '#fff',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', // 12 columns; one for each fret
  gridTemplateRows: 'auto 48px 48px 48px 48px 48px 48px 30px', // fret numbers, string 1, 2, 3, 4, 5, 6, bottom padding
  width: '100%',
  height: 'auto',
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
  const dispatch = useDispatch();
  const onStartClick = useCallback(() => {
    dispatch(setQuizNote(getUniqueNote(allNotes, quizNote)));
  }, [dispatch, quizNote]);

  return (
    <>
      <h1>{quizNote}</h1>
      <button onClick={onStartClick}>Start</button>
      <div css={containerStyle}>
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
      </div>
    </>
  );
};
