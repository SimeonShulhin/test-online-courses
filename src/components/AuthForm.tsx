import React, { useState } from 'react';
import { validateEmail, validatePassword, getPasswordErrorMessage } from '../utils/validation';

interface AuthFormProps {
  onAuthSuccess: (email: string) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Введіть коректний email адрес';
    }

    if (!validatePassword(password)) {
      newErrors.password =
        getPasswordErrorMessage(password) ||
        'Пароль повинен містити мінімум 6 символів, одну велику літеру, одну малу та спецсимвол';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate authentication
    onAuthSuccess(email);
    setErrors({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900'>
      <div className='w-full max-w-md p-8 rounded-2xl border-white/20 md:bg-white/10 md:backdrop-blur-md md:shadow-2xl md:border'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white mb-2'>EduPlatform</h1>
          <p className='text-blue-200'>Ваш шлях до нових знань</p>
        </div>

        <div className='space-y-6'>
          <div>
            <label className='block text-white text-sm font-medium mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all'
              placeholder='your@email.com'
            />
            {errors.email && <p className='mt-1 text-red-300 text-sm'>{errors.email}</p>}
          </div>

          <div>
            <label className='block text-white text-sm font-medium mb-2'>Пароль</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className='w-full px-4 py-3 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all'
              placeholder='••••••••'
            />
            {errors.password && <p className='mt-1 text-red-300 text-sm'>{errors.password}</p>}
          </div>

          <button
            type='button'
            onClick={handleSubmit}
            className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg'>
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
        </div>

        <div className='mt-6 text-center'>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className='text-blue-300 hover:text-blue-200 transition-colors'>
            {isLogin ? 'Немає аккаунта? Зареєструйтеся' : 'Вже є аккаунт? Увійдіть'}
          </button>
        </div>
      </div>
    </div>
  );
};
