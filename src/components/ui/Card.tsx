import React, { useMemo, useCallback } from 'react';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = React.memo(({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
  hover = false,
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = useMemo(() => ({
    default: 'bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-600',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-600',
    outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-md',
    gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 shadow-lg border border-gray-200 dark:border-gray-600',
  }), []);
  
  const paddingClasses = useMemo(() => ({
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }), []);
  
  const hoverClasses = useMemo(() => 
    hover ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : '', 
    [hover]
  );
  
  const clickableClasses = useMemo(() => 
    onClick ? 'cursor-pointer' : '', 
    [onClick]
  );
  
  const classes = useMemo(() => 
    `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${clickableClasses} ${className}`,
    [baseClasses, variantClasses, variant, paddingClasses, padding, hoverClasses, clickableClasses, className]
  );
  
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  
  return (
    <div 
      className={classes}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
