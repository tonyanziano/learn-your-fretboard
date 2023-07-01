import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectQuizState = (state: RootState) => state.quiz;
const selectQuizNote = createSelector(selectQuizState, state => state.note);
const selectQuizScore = createSelector(selectQuizState, state => state.score);

export { selectQuizNote, selectQuizScore };
