import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button, Input, Card } from '../../components/ui';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Тест кнопка</Button>);
    expect(screen.getByText('Тест кнопка')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');

    rerender(<Button variant="gradient">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-to-r', 'from-red-400', 'to-red-600');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Button size="lg">Кнопка</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-base');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Кнопка</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Кнопка</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('supports submit type', () => {
    render(<Button type="submit">Отправить</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});

describe('Input Component', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Введите текст" />);
    expect(screen.getByPlaceholderText('Введите текст')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Имя" name="name" />);
    expect(screen.getByText('Имя')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label="Имя" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'тест' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'тест'
      })
    }));
  });

  it('displays error message', () => {
    render(<Input error="Обязательное поле" value="test" onChange={() => {}} />);
    expect(screen.getByText('Обязательное поле')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });
});

describe('Card Component', () => {
  it('renders children content', () => {
    render(<Card>Тестовый контент</Card>);
    expect(screen.getByText('Тестовый контент')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Card variant="default">Контент</Card>);
    const cardElement = screen.getByText('Контент').closest('div');
    expect(cardElement).toHaveClass('bg-white', 'dark:bg-gray-800');

    rerender(<Card variant="elevated">Контент</Card>);
    const elevatedCard = screen.getByText('Контент').closest('div');
    expect(elevatedCard).toHaveClass('shadow-xl', 'dark:shadow-2xl');
  });

  it('applies padding classes correctly', () => {
    const { rerender } = render(<Card padding="sm">Контент</Card>);
    const cardElement = screen.getByText('Контент').closest('div');
    expect(cardElement).toHaveClass('p-3');

    rerender(<Card padding="lg">Контент</Card>);
    const largeCard = screen.getByText('Контент').closest('div');
    expect(largeCard).toHaveClass('p-8');
  });

  it('handles click events when onClick provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Кликабельная карточка</Card>);
    
    const cardElement = screen.getByText('Кликабельная карточка').closest('div');
    expect(cardElement).toBeInTheDocument();
    
    if (cardElement) {
      fireEvent.click(cardElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  it('applies hover effects when enabled', () => {
    render(<Card hover>Карточка с эффектом</Card>);
    const cardElement = screen.getByText('Карточка с эффектом').closest('div');
    expect(cardElement).toHaveClass('hover:shadow-lg', 'hover:scale-[1.02]');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Контент</Card>);
    const cardElement = screen.getByText('Контент').closest('div');
    expect(cardElement).toHaveClass('custom-class');
  });
});
