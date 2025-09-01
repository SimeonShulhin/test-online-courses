import type { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Основи React.js',
    description:
      'Повний курс з основ React для початківців. Вивчіть компоненти, хуки та state management.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    price: 1299,
  },
  {
    id: 2,
    title: 'TypeScript для розробників',
    description: 'Поглиблений курс TypeScript з практичними прикладами та реальними проєктами.',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    price: 1599,
  },
  {
    id: 3,
    title: 'Redux та State Management',
    description: 'Вивчіть сучасні підходи до управління станом у React додатках.',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    price: 999,
  },
  {
    id: 4,
    title: 'Node.js Backend Development',
    description: 'Створюйте потужні backend додатки з Node.js, Express та MongoDB.',
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    price: 1899,
  },
];
