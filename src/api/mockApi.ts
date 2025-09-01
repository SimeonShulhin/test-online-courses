import type { Course } from '../types';
import { mockCourses } from '../data/mockData';

export const mockAPI = {
  getCourses: (): Promise<Course[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCourses);
      }, 1000);
    });
  },
  
  handlePurchase: (courseId: number): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, message: `Курс ${courseId} успішно придбано!` });
        } else {
          reject({ success: false, message: 'Помилка оплати. Спробуйте ще раз.' });
        }
      }, 1500);
    });
  }
};