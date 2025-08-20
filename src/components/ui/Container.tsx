import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'lg',
  center = true,
}) => {
  const baseClasses = 'w-full';
  
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8',
  };
  
  const centerClasses = center ? 'mx-auto' : '';
  
  const classes = `${baseClasses} ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${centerClasses} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Container;
