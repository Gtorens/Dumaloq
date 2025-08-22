import React from 'react';

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'light' | 'dark' | 'gradient';
  container?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Section: React.FC<SectionProps> = ({
  id,
  className = '',
  children,
  padding = 'lg',
  background = 'default',
  container = true,
  maxWidth = 'xl',
}) => {
  const baseClasses = 'w-full';
  
  const paddingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };
  
  const backgroundClasses = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  };
  
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  };
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`;
  
  const content = container ? (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`}>
      {children}
    </div>
  ) : children;
  
  return (
    <section id={id} className={classes}>
      {content}
    </section>
  );
};

export default Section;
