import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSettingsState = (state: RootState) => state.settings;

export const selectAccidentalNotesEnabled = createSelector(
  selectSettingsState,
  state => state.accidentalNotes
);

export const selectNaturalNotesEnabled = createSelector(
  selectSettingsState,
  state => state.naturalNotes
);
