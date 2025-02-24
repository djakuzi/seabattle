import { configureStore } from '@reduxjs/toolkit';
import mainSliderScreen from './slice/mainSliderScreen';

 const store = configureStore({
   reducer: {
     sliderScreen: mainSliderScreen,
   },
 });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

