import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectMetronomeState = (state: RootState) => state.metronome;
const selectMetronomeVolume = createSelector(
  selectMetronomeState,
  state => state.volume
);
const selectMetronomeIsMuted = createSelector(
  selectMetronomeState,
  state => state.muted
);

export { selectMetronomeVolume, selectMetronomeIsMuted };
