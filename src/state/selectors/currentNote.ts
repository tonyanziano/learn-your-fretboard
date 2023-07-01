import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectCurrentNoteState = (state: RootState) => state.currentNote;
const selectPlayAlongNote = createSelector(
  selectCurrentNoteState,
  state => state.playAlongNote
);

export { selectPlayAlongNote };
