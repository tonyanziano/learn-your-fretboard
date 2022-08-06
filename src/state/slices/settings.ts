import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum IncludedNotes {
  All,
  Natural,
  Accidental,
}

type SettingsState = {
  includedNotes: IncludedNotes;
};

const initialState: SettingsState = {
  includedNotes: IncludedNotes.Natural,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIncludedNotes: (state, action: PayloadAction<IncludedNotes>) => {
      state.includedNotes = action.payload;
    },
  },
});

export const { setIncludedNotes } = settingsSlice.actions;
