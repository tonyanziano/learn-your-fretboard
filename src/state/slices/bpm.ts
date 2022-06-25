import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BPMState = {
  bpm: number;
};

const initialState: BPMState = {
  bpm: 40,
};

export const bpmSlice = createSlice({
  name: 'bpm',
  initialState,
  reducers: {
    setBPM: (state, action: PayloadAction<number>) => {
      state.bpm = action.payload;
    },
  },
});

export const { setBPM } = bpmSlice.actions;
