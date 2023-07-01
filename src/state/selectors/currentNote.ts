import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectCurrentNoteState = (state: RootState) => state.currentNote;
const selectPlayAlongNote = createSelector(
  selectCurrentNoteState,
  state => state.playAlongNote
);
const selectQuizNote = createSelector(
  selectCurrentNoteState,
  state => state.quizNote
);
const selectQuizScore = createSelector(
  selectCurrentNoteState,
  state => state.quizScore
);

export { selectPlayAlongNote, selectQuizNote, selectQuizScore };
