import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccidentalNotes, NaturalNotes } from '../../constants';
import { getUniqueNote } from '../../utils/getUniqueNote';

const allNotes = [...NaturalNotes, ...AccidentalNotes];

type QuizState = {
  note: string;
  score: {
    totalGuesses: number;
    correctGuesses: number;
  };
  guessedNote: string;
  isStarted: boolean;
};

const initialState: QuizState = {
  note: '',
  score: {
    totalGuesses: 0,
    correctGuesses: 0,
  },
  guessedNote: '',
  isStarted: false,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    scoreQuizGuess: (state, action: PayloadAction<string>) => {
      if (!state.isStarted) {
        // no-op if user clicks a note and the quiz hasn't started yet
        return;
      }
      const isCorrect = state.note === action.payload;
      if (isCorrect) {
        state.score.correctGuesses++;
      }
      state.score.totalGuesses++;
      state.guessedNote = action.payload;
      state.note = getUniqueNote(allNotes, state.note);
    },
    setQuizNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    setQuizIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload;
      if (action.payload === true) {
        // reset score
        state.score.correctGuesses = 0;
        state.score.totalGuesses = 0;
      }
    },
  },
});

export const { setQuizIsStarted, setQuizNote, scoreQuizGuess } =
  quizSlice.actions;
