import { ReactNode } from 'react';

// Theme Types
export type Theme = 'light' | 'dark';

// Language Types
export type Language = 'ru' | 'en';

// App Context Types
export interface AppContextType {
  theme: Theme;
  language: Language;
  texts: Record<string, unknown>;
  toggleTheme: () => void;
  setLanguage: (_language: Language) => void;
}

// Component Props Base
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Section Component Props
export interface SectionComponentProps extends BaseComponentProps {
  id?: string;
  theme?: Theme;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  className?: string;
}
