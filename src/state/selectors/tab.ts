import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectTabState = (state: RootState) => state.tab;

export const selectCurrentTab = createSelector(
  selectTabState,
  state => state.currentTab
);
