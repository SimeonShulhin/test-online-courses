import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setCourses, setLoading, purchaseCourse } from '../store/slices/coursesSlice';
import type { Course } from '../types';
import { mockAPI } from '../api/mockApi';
import { CourseCard } from './CourseCard';
import { VideoModal } from './VideoModal';

export const CourseList: React.FC = () => {
  const dispatch = useDispatch();
  const { courses, purchasedCourses, loading } = useSelector((state: RootState) => state.courses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchaseLoading, setPurchaseLoading] = useState<number | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      dispatch(setLoading(true));
      try {
        const coursesData = await mockAPI.getCourses();
        dispatch(setCourses(coursesData));
      } catch (error) {
        console.error('Error loading courses:', error);
        dispatch(setLoading(false));
      }
    };

    loadCourses();
  }, [dispatch]);

  const handlePurchase = async (courseId: number) => {
    setPurchaseLoading(courseId);
    try {
      const result = await mockAPI.handlePurchase(courseId);
      if (result.success) {
        dispatch(purchaseCourse(courseId));
        alert(result.message);
      }
    } catch (error: unknown) {
      alert((error as Error).message || 'Помилка при покупці курсу');
    } finally {
      setPurchaseLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-white text-lg">Завантаження курсів...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isPurchased={purchasedCourses.includes(course.id)}
            onPlay={() => setSelectedCourse(course)}
            onPurchase={() => handlePurchase(course.id)}
            isLoading={purchaseLoading === course.id}
          />
        ))}
      </div>

      <VideoModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
};