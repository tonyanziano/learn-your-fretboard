import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  naturalNotes: boolean;
  accidentalNotes: boolean;
};

const initialState: SettingsState = {
  naturalNotes: true,
  accidentalNotes: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNaturalNotes: state => {
      state.naturalNotes = !state.naturalNotes;
    },
    toggleAccidentalNotes: state => {
      state.accidentalNotes = !state.accidentalNotes;
    },
  },
});

export const { toggleNaturalNotes, toggleAccidentalNotes } =
  settingsSlice.actions;
