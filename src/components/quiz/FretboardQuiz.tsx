import React from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { String } from './String';

const containerStyle = css({
  backgroundColor: '#fff',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr', // 12 columns; one for each fret
  width: '100%',
  height: 500,
});

const topStyle = css({
  borderBottom: '1px solid #000',
  height: 30,
  gridColumn: '1 / 13',
  gridRow: 2,
});

const bottomStyle = css({
  borderTop: '1px solid #000',
  height: 30,
  gridColumn: '1 / 13',
  gridRow: 9,
});

const fretNumberStyle = css({
  color: '#000',
  paddingTop: 24,
  textAlign: 'center',
});

const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
const dummyNotes = [
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
];
const getNotesForString = (_stringNum: number) => dummyNotes;
const fretNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const FretboardQuiz: React.FC = () => {
  return (
    <div css={containerStyle}>
      {fretNumbers.map(fNum => (
        <div css={fretNumberStyle} key={`fret-number-${fNum}`}>
          {fNum}
        </div>
      ))}
      <div css={topStyle} key={'top-padding'}></div>
      {strings.map((_s, sNum) => {
        const notes = getNotesForString(sNum);
        return <String key={`string-${sNum}`} notes={notes} number={sNum} />;
      })}
      <div css={bottomStyle} key={'bottom-padding'}></div>
    </div>
  );
};
