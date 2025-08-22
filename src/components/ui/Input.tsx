import React, { forwardRef, InputHTMLAttributes, useState, useCallback } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onValidation?: (isValid: boolean) => void; // eslint-disable-line no-unused-vars
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    showPasswordToggle = false,
    onValidation,
    validateOnBlur = true,
    validateOnChange = false,
    className = '', 
    type = 'text',
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const passwordToggleId = `${inputId}-password-toggle`;

    // Определяем, нужно ли показывать ошибку
    const shouldShowError = error && (hasInteracted || props.value);
    const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    }, [props]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasInteracted(true);
      
      if (validateOnBlur && onValidation) {
        onValidation(!error);
      }
      
      if (props.onBlur) {
        props.onBlur(e);
      }
    }, [error, validateOnBlur, onValidation, props]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setHasInteracted(true);
      
      if (validateOnChange && onValidation) {
        onValidation(!error);
      }
      
      if (props.onChange) {
        props.onChange(e);
      }
    }, [error, validateOnChange, onValidation, props]);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword(!showPassword);
    }, [showPassword]);

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-label="обязательное поле">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400" aria-hidden="true">
                {leftIcon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`
              block w-full px-3 py-2 border rounded-md shadow-sm
              ${leftIcon ? 'pl-10' : ''}
              ${(rightIcon || showPasswordToggle) ? 'pr-10' : ''}
              ${shouldShowError 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : isFocused
                ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
              }
              dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200 ease-in-out
              ${className}
            `}
            aria-invalid={shouldShowError ? 'true' : 'false'}
            aria-describedby={
              shouldShowError 
                ? errorId 
                : helperText 
                  ? helperId 
                  : undefined
            }
            aria-required={props.required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              id={passwordToggleId}
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              aria-pressed={showPassword}
            >
              <div className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </div>
            </button>
          )}
          
          {rightIcon && !showPasswordToggle && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400" aria-hidden="true">
                {rightIcon}
              </div>
            </div>
          )}
        </div>
        
        {shouldShowError && (
          <p 
            id={errorId} 
            className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center" 
            role="alert"
            aria-live="polite"
          >
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {helperText && !shouldShowError && (
          <p id={helperId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
