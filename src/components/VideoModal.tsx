import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Course } from '../types';
import { setCurrentVideo, updateVideoTime } from '../store/slices/videoSlice';

interface VideoModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ course, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideo = useSelector((state: RootState) => state.video.currentVideo);

  // Відновлення стану відео при відкритті модального вікна
  useEffect(() => {
    if (isOpen && videoRef.current && course && currentVideo?.courseId === course.id) {
      const video = videoRef.current;
      video.currentTime = currentVideo.currentTime;

      if (currentVideo.isPlaying) {
        video.play().catch(console.error);
      }
    }
  }, [isOpen, currentVideo, course]);

  // Збереження стану при закритті
  const handleClose = () => {
    if (videoRef.current && course && currentVideo?.courseId === course.id) {
      const video = videoRef.current;
      dispatch(
        updateVideoTime({
          currentTime: video.currentTime,
          duration: video.duration || 0,
        })
      );
    }
    onClose();
  };

  if (!isOpen || !course) return null;

  const handleVideoPlay = () => {
    if (!course) return;
    dispatch(setCurrentVideo({ courseId: course.id, isPlaying: true }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={handleBackdropClick}>
      <div className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-gray-800'>{course.title}</h2>
            <button
              onClick={handleClose}
              className='text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100'>
              ×
            </button>
          </div>

          <div className='mb-4'>
            <video
              ref={videoRef}
              controls
              className='w-full rounded-lg shadow-lg'
              onPlay={handleVideoPlay}
              preload='metadata'>
              <source src={course.videoUrl} type='video/mp4' />
              Ваш браузер не підтримує відео.
            </video>
          </div>

          <div className='text-gray-600'>
            <p className='mb-4'>{course.description}</p>
            <p className='text-lg font-semibold text-blue-600'>Ціна: {course.price} ₴</p>
          </div>
        </div>
      </div>
    </div>
  );
};
