import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum IncludedNotes {
  All,
  Natural,
  Accidental,
}

type SettingsState = {
  includedNotes: IncludedNotes;
  expanded: boolean;
};

const initialState: SettingsState = {
  includedNotes: IncludedNotes.Natural,
  expanded: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIncludedNotes: (state, action: PayloadAction<IncludedNotes>) => {
      state.includedNotes = action.payload;
    },
    toggleExpanded: state => {
      state.expanded = !state.expanded;
    },
  },
});

export const { setIncludedNotes, toggleExpanded: toggleSettingsExpanded } =
  settingsSlice.actions;
