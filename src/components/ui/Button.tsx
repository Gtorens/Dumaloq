import React, { forwardRef, ButtonHTMLAttributes, useState, useCallback } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  ripple?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    disabled,
    fullWidth = false,
    rounded = 'full',
    ripple = true,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number } | null>(null);
    
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 active:bg-gray-100',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
      gradient: 'bg-gradient-to-r from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 focus:ring-red-400 active:from-red-600 active:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-105'
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    };
    
    const roundedClasses = {
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    };
    
    const widthClasses = fullWidth ? 'w-full' : '';
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${widthClasses} ${className}`;
    
    const isDisabled = disabled || loading;
    
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || isDisabled) return;
      
      setIsPressed(true);
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setRippleEffect({ x, y });
      
      // Убираем эффект ripple через 600ms
      setTimeout(() => {
        setRippleEffect(null);
        setIsPressed(false);
      }, 600);
    }, [ripple, isDisabled]);
    
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!isDisabled) {
          e.currentTarget.click();
        }
      }
    }, [isDisabled]);
    
    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-pressed={isPressed}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Ripple эффект */}
        {rippleEffect && (
          <span
            className="absolute bg-white opacity-30 rounded-full pointer-events-none animate-ping"
            style={{
              left: rippleEffect.x - 10,
              top: rippleEffect.y - 10,
              width: 20,
              height: 20,
              animationDuration: '600ms'
            }}
          />
        )}
        
        {/* Loading спиннер */}
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {/* Левая иконка */}
        {!loading && leftIcon && (
          <span className="mr-2" aria-hidden="true">{leftIcon}</span>
        )}
        
        {/* Текст кнопки */}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
        
        {/* Правая иконка */}
        {!loading && rightIcon && (
          <span className="ml-2" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
