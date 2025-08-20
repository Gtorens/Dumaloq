import React, { useState, useCallback, useRef, useEffect } from 'react';
import { z } from 'zod';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationSchema?: z.ZodSchema<T>;
  onSubmit: (_values: T) => Promise<void> | void;
  onError?: (_errors: Partial<Record<keyof T, string>>) => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
  onError,
  validateOnChange = true,
  validateOnBlur = true
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    isDirty: false
  });

  const initialValuesRef = useRef(initialValues);
  const isInitialMount = useRef(true);

  // Проверяем, изменились ли значения
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const hasChanges = Object.keys(initialValues).some(
      key => initialValues[key as keyof T] !== state.values[key as keyof T]
    );

    setState(prev => ({ ...prev, isDirty: hasChanges }));
  }, [state.values, initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setState(prev => {
      const newValues = { ...prev.values, [field]: value };
      const newErrors = { ...prev.errors, [field]: undefined };
      
      return {
        ...prev,
        values: newValues,
        errors: newErrors
      };
    });

    // Валидация при изменении
    if (validateOnChange && validationSchema) {
      setTimeout(() => validateField(field, value), 0);
    }
  }, [validateOnChange, validationSchema]);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error }
    }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, touched: boolean = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: touched }
    }));

    // Валидация при потере фокуса
    if (validateOnBlur && validationSchema) {
      validateField(field, state.values[field]);
    }
  }, [validateOnBlur, validationSchema, state.values]);

  const validateField = useCallback((field: keyof T, _value: unknown) => {
    if (!validationSchema) return true;

    try {
      // Валидируем весь объект, но показываем ошибку только для конкретного поля
      validationSchema.parse(state.values);
      setFieldError(field, '');
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Ищем ошибку для конкретного поля
        const fieldError = error.issues.find(issue => issue.path[0] === field);
        if (fieldError) {
          setFieldError(field, fieldError.message);
          return false;
        }
      }
      return true;
    }
  }, [validationSchema, setFieldError, state.values]);

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;

    try {
      validationSchema.parse(state.values);
      setState(prev => ({ ...prev, errors: {}, isValid: true }));
      return true;
    } catch (error) {
      const errors: Partial<Record<keyof T, string>> = {};
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof T;
          errors[field] = issue.message;
        });
      }
      setState(prev => ({ ...prev, errors, isValid: false }));
      
      // Вызываем обработчик ошибок
      if (onError) {
        onError(errors);
      }
      
      return false;
    }
  }, [validationSchema, state.values, onError]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(state.values);
      // Сбрасываем форму после успешной отправки
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
      // Можно добавить обработку ошибок сервера
      if (error instanceof Error) {
        setFieldError('submit' as keyof T, error.message);
      }
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [validateForm, onSubmit, state.values, setFieldError]);

  const resetForm = useCallback(() => {
    setState({
      values: initialValuesRef.current,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true,
      isDirty: false
    });
  }, []);

  const setValues = useCallback((newValues: Partial<T>) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, ...newValues }
    }));
  }, []);

  const getFieldProps = useCallback((field: keyof T) => ({
    value: state.values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFieldValue(field, e.target.value);
    },
    onBlur: () => setFieldTouched(field, true),
    error: state.errors[field],
    touched: state.touched[field],
    hasError: !!state.errors[field] && state.touched[field]
  }), [state.values, state.errors, state.touched, setFieldValue, setFieldTouched]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    isValid: state.isValid,
    isDirty: state.isDirty,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setValues,
    validateField,
    validateForm,
    handleSubmit,
    resetForm,
    getFieldProps
  };
}
