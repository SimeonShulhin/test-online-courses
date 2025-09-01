import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  currentVideo: {
    courseId: number;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
  } | null;
}

const initialState: VideoState = {
  currentVideo: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<{ courseId: number; isPlaying: boolean }>) => {
      console.log('setCurrentVideo');
      const { courseId, isPlaying } = action.payload;
      if (state.currentVideo && state.currentVideo.courseId === courseId) {
        state.currentVideo.isPlaying = isPlaying;
      } else {
        state.currentVideo = {
          courseId,
          isPlaying,
          currentTime: 0,
          duration: 0,
        };
      }
    },
    updateVideoTime: (state, action: PayloadAction<{ currentTime: number; duration: number }>) => {
      if (state.currentVideo) {
        state.currentVideo.currentTime = action.payload.currentTime;
        state.currentVideo.duration = action.payload.duration;
      }
    },

    stopVideo: (state) => {
      state.currentVideo = null;
    },
  },
});

export const { setCurrentVideo, updateVideoTime, stopVideo } = videoSlice.actions;
export default videoSlice.reducer;
