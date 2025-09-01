import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import userReducer from './slices/userSlice';
import videoReducer from './slices/videoSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;