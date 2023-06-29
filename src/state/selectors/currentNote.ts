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

export { selectPlayAlongNote, selectQuizNote };
