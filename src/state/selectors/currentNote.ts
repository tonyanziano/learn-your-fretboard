import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectCurrentNoteState = (state: RootState) => state.currentNote;
const selectCurrentNote = createSelector(
  selectCurrentNoteState,
  state => state
);

export { selectCurrentNote };
