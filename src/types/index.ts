export interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface VideoState {
  courseId: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export interface AppState {
  courses: Course[];
  purchasedCourses: number[];
  user: User | null;
  currentVideo: VideoState | null;
  loading: boolean;
}
