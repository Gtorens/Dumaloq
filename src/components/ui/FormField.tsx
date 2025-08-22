import React, { forwardRef, InputHTMLAttributes, useId } from 'react';
import Input from './Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onValidation?: (isValid: boolean) => void; // eslint-disable-line no-unused-vars
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  fieldClassName?: string;
  labelClassName?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ 
    label,
    error,
    helperText,
    required = false,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    onValidation,
    validateOnBlur = true,
    validateOnChange = false,
    fieldClassName = '',
    labelClassName = '', // eslint-disable-line no-unused-vars
    className = '',
    id,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const fieldId = id || generatedId;
    
    return (
      <div className={`form-field ${fieldClassName}`}>
        <Input
          ref={ref}
          id={fieldId}
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          showPasswordToggle={showPasswordToggle}
          onValidation={onValidation}
          validateOnBlur={validateOnBlur}
          validateOnChange={validateOnChange}
          className={className}
          {...props}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
