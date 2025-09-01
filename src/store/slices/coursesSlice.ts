import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Course } from '../../types';

interface CoursesState {
  courses: Course[];
  purchasedCourses: number[];
  loading: boolean;
}

const initialState: CoursesState = {
  courses: [],
  purchasedCourses: [],
  loading: false,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    purchaseCourse: (state, action: PayloadAction<number>) => {
      if (!state.purchasedCourses.includes(action.payload)) {
        state.purchasedCourses.push(action.payload);
      }
    },
  },
});

export const { setCourses, setLoading, purchaseCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
