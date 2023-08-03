import React, { useCallback, useMemo } from 'react';
/** @jsxFrag jsx **/
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizNote } from '../../state/selectors/quiz';
import { scoreQuizGuess } from '../../state/slices/quiz';

const noteHeight = 48;

const noteStyle = (number: number) =>
  css({
    backgroundColor: '#fff',
    borderLeft: number === 0 ? '1px solid #000' : 'none',
    borderRight: '1px solid #000',
    cursor: 'pointer',
    position: 'relative',
    height: noteHeight,
    minWidth: 52,

    ':hover': {
      backgroundColor: '#abe3fb',
      // using outline here so that it doesn't affect the size of the element and therefore
      // the absolutely-positioned inlay elements that are children of certain note elements
      outline: '3px solid #f16935',
      outlineOffset: -3,
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

const inlayDiameter = 16;
const singleDotInlayStyle = css({
  pointerEvents: 'none',
  position: 'absolute',
  top: `calc(-${2 * noteHeight}px - ${inlayDiameter / 2}px)`, // middle of the 3rd and 4th strings
  left: `calc(50% - ${inlayDiameter / 2}px)`,
  height: inlayDiameter,
  width: inlayDiameter,
  borderRadius: inlayDiameter,
  backgroundColor: '#000',
});

const doubleDotInlayUpperStyle = css({
  pointerEvents: 'none',
  position: 'absolute',
  top: `calc(-${3 * noteHeight}px - ${inlayDiameter / 2}px)`, // middle of the 5th and 4th strings
  left: `calc(50% - ${inlayDiameter / 2}px)`,
  height: inlayDiameter,
  width: inlayDiameter,
  borderRadius: inlayDiameter,
  backgroundColor: '#000',
});

const doubleDotInlayLowerStyle = css({
  pointerEvents: 'none',
  position: 'absolute',
  top: `calc(-${1 * noteHeight}px - ${inlayDiameter / 2}px)`, // middle of the 2nd and 3rd strings
  left: `calc(50% - ${inlayDiameter / 2}px)`,
  height: inlayDiameter,
  width: inlayDiameter,
  borderRadius: inlayDiameter,
  backgroundColor: '#000',
});

type NoteProps = {
  note: string;
  number: number;
  stringNumber: number;
};

export const Note: React.FC<NoteProps> = props => {
  const { note, number, stringNumber } = props;
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

  const inlays = useMemo(() => {
    // need to render these later in the stacking context so they don't get truncated;
    // we will use the 6th string
    if (stringNumber === 5) {
      if (number === 2 || number === 4 || number === 6 || number === 8) {
        // single dot inlay (3rd, 5th, 7th, and 9th frets)
        return <div css={singleDotInlayStyle}></div>;
      } else if (number === 11) {
        // double dot inlay (12th fret)
        return (
          <>
            <div css={doubleDotInlayUpperStyle}></div>
            <div css={doubleDotInlayLowerStyle}></div>
          </>
        );
      }
    } else {
      return null;
    }
  }, [number, stringNumber]);

  return (
    <div css={noteStyle(number)} onClick={onNoteClick}>
      <div css={stringStyle}></div>
      {inlays}
    </div>
  );
};
