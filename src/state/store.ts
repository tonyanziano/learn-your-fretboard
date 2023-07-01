import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bpmSlice } from './slices/bpm';
import { metronomeSlice } from './slices/metronome';
import { settingsSlice } from './slices/settings';
import { tabSlice } from './slices/tab';
import { quizSlice } from './slices/quiz';
import { playAlongSlice } from './slices/playAlong';

export const store = configureStore({
  reducer: combineReducers({
    bpm: bpmSlice.reducer,
    metronome: metronomeSlice.reducer,
    playAlong: playAlongSlice.reducer,
    quiz: quizSlice.reducer,
    settings: settingsSlice.reducer,
    tab: tabSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
