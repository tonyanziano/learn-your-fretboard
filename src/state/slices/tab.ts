import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Tab = 'play-along' | 'quiz';

type TabState = {
  currentTab: Tab;
};

const initialState: TabState = {
  currentTab: 'play-along',
};

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Tab>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabSlice.actions;
