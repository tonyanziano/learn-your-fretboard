import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectPlayAlongState = (state: RootState) => state.playAlong;
const selectPlayAlongNote = createSelector(
  selectPlayAlongState,
  state => state.note
);

export { selectPlayAlongNote };
