import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectBPMState = (state: RootState) => state.bpm;
const selectBPM = createSelector(selectBPMState, (state) => state.bpm);

export { selectBPM };
