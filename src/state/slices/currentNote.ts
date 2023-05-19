import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentNoteState = {
  note: string;
};

const initialState: CurrentNoteState = {
  note: '',
};

export const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
  },
});

export const { setCurrentNote } = currentNoteSlice.actions;
