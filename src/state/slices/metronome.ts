import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MetronomeState = {
  muted: boolean;
  volume: number;
};

const initialState: MetronomeState = {
  muted: true,
  volume: 0.4,
};

export const metronomeSlice = createSlice({
  name: 'metronome',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    toggleMute: state => {
      state.muted = !state.muted;
    },
  },
});

export const {
  setVolume: setMetronomeVolume,
  toggleMute: toggleMetronomeMute,
} = metronomeSlice.actions;
