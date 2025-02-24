import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface initialState {
  screen: string;
}

const initialState: initialState = {
  screen: 'menu',
};

const sliceSettings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
  },
});

export const actionsMainSliderScreen = sliceSettings.actions;
export default sliceSettings.reducer;
