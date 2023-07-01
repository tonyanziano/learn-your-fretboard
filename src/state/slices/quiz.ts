import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QuizState = {
  note: string;
  score: {
    totalGuesses: number;
    correctGuesses: number;
  };
  guessedNote: string;
};

const initialState: QuizState = {
  note: '',
  score: {
    totalGuesses: 0,
    correctGuesses: 0,
  },
  guessedNote: '',
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    scoreQuizGuess: (state, action: PayloadAction<string>) => {
      const isCorrect = state.note === action.payload;
      if (isCorrect) {
        state.score.correctGuesses++;
      }
      state.score.totalGuesses++;
      state.guessedNote = action.payload;
    },
    setQuizNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
  },
});

export const { setQuizNote, scoreQuizGuess } = quizSlice.actions;
