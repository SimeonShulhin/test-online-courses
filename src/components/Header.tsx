import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/slices/userSlice';
import { stopVideo } from '../store/slices/videoSlice';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const purchasedCourses = useSelector((state: RootState) => state.courses.purchasedCourses);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    dispatch(stopVideo()); // Зупиняємо відео при виході
  };

  return (
    <header className='bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-2xl font-bold text-white'>EduPlatform</h1>
            <div className='hidden sm:block'>
              <span className='text-blue-200 text-sm bg-white/20 px-3 py-1 rounded-full'>
                Придбано курсів: {purchasedCourses.length}
              </span>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='hidden md:block text-white text-sm'>
              Привіт, <span className='font-medium'>{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className='px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium'>
              Вийти
            </button>
          </div>
        </div>

        <div className='sm:hidden mt-2 flex items-center justify-between'>
          <span className='text-blue-200 text-sm bg-white/20 px-3 py-1 rounded-full'>
            Придбано курсів: {purchasedCourses.length}
          </span>
        </div>
      </div>
    </header>
  );
};
