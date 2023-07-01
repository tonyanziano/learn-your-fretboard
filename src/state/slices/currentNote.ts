import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: think about the structure of this state - should
// we break this up into separate quiz & play along slices
// or does it make sense to keep them under "currentNote"
type CurrentNoteState = {
  playAlongNote: string;
};

const initialState: CurrentNoteState = {
  playAlongNote: '',
};

export const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setPlayAlongNote: (state, action: PayloadAction<string>) => {
      state.playAlongNote = action.payload;
    },
  },
});

export const { setPlayAlongNote } = currentNoteSlice.actions;
