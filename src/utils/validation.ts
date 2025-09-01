export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar;
};

export const getPasswordErrorMessage = (password: string): string => {
  if (password.length < 6) {
    return 'Пароль повинен містити мінімум 6 символів';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Пароль повинен містити принаймні одну велику літеру';
  }
  if (!/[a-z]/.test(password)) {
    return 'Пароль повинен містити принаймні одну малу літеру';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Пароль повинен містити принаймні один спеціальний символ';
  }
  return '';
};
