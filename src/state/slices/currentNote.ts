import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: think about the structure of this state - should
// we break this up into separate quiz & play along slices
// or does it make sense to keep them under "currentNote"
type CurrentNoteState = {
  playAlongNote: string;
  quizNote: string;
  quizScore: {
    correct: number;
    total: number;
  };
};

const initialState: CurrentNoteState = {
  playAlongNote: '',
  quizNote: '',
  quizScore: {
    correct: 0,
    total: 0,
  },
};

type QuizGuessPayload = {
  correct: boolean;
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
    scoreQuizGuess: (state, action: PayloadAction<QuizGuessPayload>) => {
      if (action.payload.correct) {
        state.quizScore.correct++;
      }
      state.quizScore.total++;
    },
  },
});

export const { setPlayAlongNote, setQuizNote } = currentNoteSlice.actions;
