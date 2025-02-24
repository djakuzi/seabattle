import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface initialState {
    screen: string;
}

const initialState: initialState = {
    screen: 'menu'
};

const sliceMainSliderScreen = createSlice({
  name: 'mainScreenSlider',
  initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
  },
});

export const actionsMainSliderScreen = sliceMainSliderScreen.actions;
export default sliceMainSliderScreen.reducer;