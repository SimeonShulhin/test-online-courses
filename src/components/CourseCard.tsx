import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isPurchased: boolean;
  onPlay: () => void;
  onPurchase: () => void;
  isLoading?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isPurchased,
  onPlay,
  onPurchase,
  isLoading,
}) => {
  const currentVideo = useSelector((state: RootState) => state.video.currentVideo);
  const isCurrentlyPlaying = currentVideo?.courseId === course.id && currentVideo?.isPlaying;
  const hasProgress = currentVideo?.courseId === course.id && currentVideo?.duration > 0;
  const progressPercent = hasProgress
    ? Math.round((currentVideo.currentTime / currentVideo.duration) * 100)
    : 0;

  return (
    <div className='flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group'>
      <div className='relative'>
        <div
          className='h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center cursor-pointer'
          onClick={onPlay}>
          <div
            className={`text-white text-6xl transition-all ${
              isCurrentlyPlaying ? 'opacity-100 animate-pulse' : 'opacity-50 group-hover:opacity-80'
            }`}>
            {isCurrentlyPlaying ? '⏸️' : '▶'}
          </div>
        </div>

        {/* Індикатор відтворення */}
        {isCurrentlyPlaying && (
          <div className='absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse'>
            Відтворюється
          </div>
        )}

        {/* Індикатор придбаного курсу */}
        {isPurchased && (
          <div className='absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
            Придбано
          </div>
        )}

        {/* Прогрес-бар внизу зображення */}
        {hasProgress && (
          <div className='absolute bottom-0 left-0 right-0 h-1 bg-black/20'>
            <div
              className='h-full bg-yellow-400 transition-all'
              style={{ width: `${progressPercent}%` }}></div>
          </div>
        )}
      </div>

      <div className='flex flex-col flex-1 p-6'>
        <h3 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors'>
          {course.title}
        </h3>
        <p className='flex-1 text-gray-600 mb-4 line-clamp-3'>{course.description}</p>

        {/* Прогрес переглядання */}
        {hasProgress && (
          <div className='mb-4 text-sm text-gray-500'>
            <div className='flex items-center justify-between'>
              <span>Прогрес перегляду:</span>
              <span className='font-medium text-blue-600'>{progressPercent}%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2 mt-1'>
              <div
                className='bg-blue-600 h-2 rounded-full transition-all'
                style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

        <div className='flex flex-wrap gap-2 items-end'>
          <span className='text-2xl font-bold text-blue-600'>{course.price} ₴</span>

          <div className='flex flex-wrap gap-2'>
            <button
              onClick={onPlay}
              className='flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'>
              {isCurrentlyPlaying ? 'Переглядається' : 'Переглянути'}
            </button>
            {!isPurchased && (
              <button
                onClick={onPurchase}
                disabled={isLoading}
                className='flex-1 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none'>
                {isLoading ? 'Обробка...' : 'Купити'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
