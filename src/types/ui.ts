import { ReactNode } from 'react';

// Button Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Input Types
export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  inputValue?: string;
  onChange?: (_inputValue: string) => void;
  onBlur?: () => void;
  error?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

// Card Types
export interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

// Section Types
export interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'light' | 'dark' | 'gradient';
  container?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Container Types
export interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
}
