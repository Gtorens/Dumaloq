import { z } from 'zod';

// Схемы валидации для форм
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[а-яёa-z\s-]+$/i, 'Имя может содержать только буквы, пробелы и дефисы'),
  
  email: z.string()
    .email('Введите корректный email адрес')
    .max(100, 'Email не должен превышать 100 символов'),
  
  phone: z.string()
    .regex(/^\+?[0-9\s\-()]+$/, 'Введите корректный номер телефона')
    .min(10, 'Номер телефона должен содержать минимум 10 цифр')
    .max(20, 'Номер телефона не должен превышать 20 символов'),
  
  company: z.string()
    .min(2, 'Название компании должно содержать минимум 2 символа')
    .max(100, 'Название компании не должно превышать 100 символов')
    .optional(),
  
  message: z.string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(1000, 'Сообщение не должно превышать 1000 символов'),
  
  area: z.string()
    .min(1, 'Выберите площадь')
    .optional(),
  
  floor: z.string()
    .min(1, 'Выберите этаж')
    .optional(),
});

export const searchFormSchema = z.object({
  query: z.string()
    .min(1, 'Введите поисковый запрос')
    .max(100, 'Поисковый запрос не должен превышать 100 символов')
    .trim(),
  
  category: z.string().optional(),
  priceRange: z.string().optional(),
});

// Функции санитизации
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Убираем потенциально опасные символы
    .replace(/javascript:/gi, '') // Убираем javascript: протокол
    .replace(/on\w+=/gi, '') // Убираем event handlers
    .substring(0, 1000); // Ограничиваем длину
};

export const sanitizeHTML = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d+\-()s]/g, '');
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

// Функции валидации
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[а-яёa-z\s-]{2,50}$/i;
  return nameRegex.test(name);
};

// Функция для проверки XSS
export const hasXSS = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
};

// Функция для безопасного рендеринга HTML
export const safeRenderHTML = (html: string): string => {
  if (hasXSS(html)) {
    return sanitizeHTML(html);
  }
  return html;
};

// Типы для валидации
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type SearchFormData = z.infer<typeof searchFormSchema>;
