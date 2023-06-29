import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentNoteState = {
  playAlongNote: string;
  quizNote: string;
};

const initialState: CurrentNoteState = {
  playAlongNote: '',
  quizNote: '',
};

export const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setPlayAlongNote: (state, action: PayloadAction<string>) => {
      state.playAlongNote = action.payload;
    },
    setQuizNote: (state, action: PayloadAction<string>) => {
      state.quizNote = action.payload;
    },
  },
});

export const { setPlayAlongNote, setQuizNote } = currentNoteSlice.actions;
