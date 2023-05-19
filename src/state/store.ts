import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bpmSlice } from './slices/bpm';
import { metronomeSlice } from './slices/metronome';
import { currentNoteSlice } from './slices/currentNote';
import { settingsSlice } from './slices/settings';

export const store = configureStore({
  reducer: combineReducers({
    bpm: bpmSlice.reducer,
    metronome: metronomeSlice.reducer,
    currentNote: currentNoteSlice.reducer,
    settings: settingsSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
