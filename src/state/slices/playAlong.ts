import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentNoteState = {
  note: string;
};

const initialState: CurrentNoteState = {
  note: '',
};

export const playAlongSlice = createSlice({
  name: 'playAlong',
  initialState,
  reducers: {
    setPlayAlongNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
  },
});

export const { setPlayAlongNote } = playAlongSlice.actions;
