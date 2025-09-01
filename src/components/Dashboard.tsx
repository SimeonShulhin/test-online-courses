import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setUser } from '../store/slices/userSlice';
import type { User } from '../types';
import { AuthForm } from './AuthForm';
import { Header } from './Header';
import { CourseList } from './CourseList';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData: User = JSON.parse(savedUser);
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  const handleAuthSuccess = (email: string) => {
    const userData: User = { email, isAuthenticated: true };
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch(setUser(userData));
  };

  if (!user?.isAuthenticated) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900'>
      <Header />

      <main className='container mx-auto px-6 py-8'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-white mb-4'>Доступні курси</h2>
          <p className='text-blue-200'>Оберіть курс для вивчення нових технологій</p>
        </div>

        <CourseList />
      </main>
    </div>
  );
};
