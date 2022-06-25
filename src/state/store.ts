import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bpmSlice } from './slices/bpm';

export const store = configureStore({
  reducer: combineReducers({
    bpm: bpmSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
