// Form Data Types
export interface ContactFormData {
  name: string;
  brand: string;
  phone: string;
  email: string;
}

// Form Error Types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ContactFormErrors {
  name?: string;
  brand?: string;
  phone?: string;
  email?: string;
  general?: string;
}

// Form State Types
export interface FormState<T> {
  data: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

// Form Submission Types
export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: FormErrors;
}

// Form Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (_inputValue: unknown) => boolean | string;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule;
}

// Form Field Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule;
  options?: Array<{ value: string; label: string }>;
}
