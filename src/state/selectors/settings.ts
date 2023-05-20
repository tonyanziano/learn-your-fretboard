import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSettingsState = (state: RootState) => state.settings;

export const selectIncludedNotes = createSelector(
  selectSettingsState,
  state => state.includedNotes
);

export const selectSettingsExpanded = createSelector(
  selectSettingsState,
  state => state.expanded
);
