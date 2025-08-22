import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/ui/Input';

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveClass('w-full', 'px-3', 'py-2');
  });

  it('renders with label', () => {
    render(<Input label="Name" name="name" id="name" />);
    
    const label = screen.getByText('Name');
    const input = screen.getByRole('textbox');
    
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'name');
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('id', 'name');
  });

  it('shows required indicator', () => {
    render(<Input label="Email" required />);
    
    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-red-500');
  });

  it('displays error message', () => {
    render(<Input error="This field is required" value="test" onChange={() => {}} />);
    
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-600');
  });

  it('applies error styling', () => {
    render(<Input error="Error" value="test" onChange={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-300');
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'test'
      })
    }));
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    
    rerender(<Input type="tel" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'tel');
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });
});
