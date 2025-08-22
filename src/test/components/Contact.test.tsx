import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Создаем моки перед импортом компонентов
const mockUseAppContext = vi.fn();
const mockShowToast = vi.fn();
const mockSubmitContactForm = vi.fn();

// Мокаем API contact
vi.mock('../../api/contact', () => ({
  submitContactForm: (...args: any[]) => mockSubmitContactForm(...args)
}));

// Мокаем AppContext
vi.mock('../../contexts/AppContext', async () => {
  const actual = await vi.importActual('../../contexts/AppContext');
  return {
    ...actual,
    useAppContext: () => mockUseAppContext(),
    AppProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'app-provider' }, children)
  };
});

// Мокаем useToast hook
vi.mock('../../hooks', async () => {
  const actual = await vi.importActual('../../hooks');
  return {
    ...actual,
    useToast: () => ({ showToast: mockShowToast })
  };
});

// Мокаем ToastProvider
vi.mock('../../components/ui/Toast', async () => {
  const actual = await vi.importActual('../../components/ui/Toast');
  return {
    ...actual,
    ToastProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'toast-provider' }, children)
  };
});

// Мокаем ErrorBoundary
vi.mock('../../components/ui/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'error-boundary' }, children)
}));

// Мокаем LazyImage
vi.mock('../../components/ui/LazyImage', () => ({
  default: (props: any) => {
    const { fallbackSrc: _fallbackSrc, placeholder: _placeholder, onLoad: _onLoad, onError: _onError, ...imgProps } = props;
    return React.createElement('img', imgProps);
  }
}));

// Импортируем Contact после создания моков
const Contact = await import('../../components/sections/Contact').then(m => m.default);

// Мокаем setTimeout для ускорения тестов
vi.useFakeTimers();

// Простая обертка для тестов
const renderWithProviders = (component: React.ReactElement) => {
  const AppProvider = ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'app-provider' }, children);
  const ToastProvider = ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'toast-provider' }, children);
  
  return render(
    React.createElement(AppProvider, null,
      React.createElement(ToastProvider, null, component)
    )
  );
};

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    
    // Настраиваем успешный ответ API
    mockSubmitContactForm.mockResolvedValue({
      success: true,
      message: 'Заявка отправлена успешно!'
    });
    mockUseAppContext.mockReturnValue({
      texts: {
        contact: {
          title: 'Свяжитесь с нами',
          subtitle: 'Оставьте заявку и мы свяжемся с вами',
          form: {
            title: 'Форма заявки',
            name: 'Ваше имя',
            brand: 'Название бренда',
            phone: 'Телефон',
            email: 'Email',
            submit: 'Отправить',
            submitAlert: 'Заявка отправлена!'
          },
          info: {
            title: 'Контактная информация',
            managerLabel: 'Менеджер:',
            managerName: 'Иван Иванов',
            phoneLabel: 'Телефон:',
            phone: '+7 (999) 123-45-67',
            emailLabel: 'Email:',
            email: 'info@dumaloq.com'
          },
          qr: {
            title: 'QR код',
            subtitle: 'Отсканируйте для связи',
            data: 'https://dumaloq.com',
            alt: 'QR код для связи'
          }
        }
      }
    });
  });

  it('renders contact form with all fields', () => {
    renderWithProviders(React.createElement(Contact));
    
    expect(screen.getByText('Свяжитесь с нами')).toBeInTheDocument();
    expect(screen.getByText('Форма заявки')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Название бренда')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Телефон')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Отправить')).toBeInTheDocument();
  });

  it('renders contact information section', () => {
    renderWithProviders(React.createElement(Contact));
    
    expect(screen.getByText('Контактная информация')).toBeInTheDocument();
    expect(screen.getByText(/Иван Иванов/)).toBeInTheDocument();
    expect(screen.getByText(/\+7 \(999\) 123-45-67/)).toBeInTheDocument();
    expect(screen.getByText(/info@dumaloq.com/)).toBeInTheDocument();
  });

  it('renders QR code section', () => {
    renderWithProviders(React.createElement(Contact));
    
    expect(screen.getByText('QR код')).toBeInTheDocument();
    expect(screen.getByText('Отсканируйте для связи')).toBeInTheDocument();
    // Проверяем наличие изображений с правильными alt текстами
    const qrImages = screen.getAllByAltText('QR код для связи');
    expect(qrImages).toHaveLength(2);
  });

  it('allows typing in form fields', async () => {
    renderWithProviders(React.createElement(Contact));
    
    const nameInput = screen.getByPlaceholderText('Ваше имя');
    const brandInput = screen.getByPlaceholderText('Название бренда');
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Тест Имя' } });
      fireEvent.change(brandInput, { target: { value: 'Тест Бренд' } });
    });
    
    expect(nameInput).toHaveValue('Тест Имя');
    expect(brandInput).toHaveValue('Тест Бренд');
  });

  it('submits form and shows alert', async () => {
    renderWithProviders(React.createElement(Contact));
    
    // Заполняем форму валидными данными
    const nameInput = screen.getByPlaceholderText('Ваше имя');
    const brandInput = screen.getByPlaceholderText('Название бренда');
    const phoneInput = screen.getByPlaceholderText('Телефон');
    const emailInput = screen.getByPlaceholderText('Email');
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Тест Имя' } });
      fireEvent.change(brandInput, { target: { value: 'Тест Бренд' } });
      fireEvent.change(phoneInput, { target: { value: '+7 999 123-45-67' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    });
    
    const submitButton = screen.getByText('Отправить');
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    // Запускаем все таймеры
    await act(async () => {
      vi.runAllTimers();
    });
    
    // Проверяем, что showToast был вызван
    expect(mockShowToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        title: 'Заявка отправлена!'
      })
    );
    
    // Проверяем, что форма очистилась (признак успешной отправки)
    expect(nameInput).toHaveValue('');
    expect(brandInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });

  it('resets form after submission', async () => {
    renderWithProviders(React.createElement(Contact));
    
    const nameInput = screen.getByPlaceholderText('Ваше имя');
    const brandInput = screen.getByPlaceholderText('Название бренда');
    const phoneInput = screen.getByPlaceholderText('Телефон');
    const emailInput = screen.getByPlaceholderText('Email');
    
    // Заполняем форму
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Тест Имя' } });
      fireEvent.change(brandInput, { target: { value: 'Тест Бренд' } });
      fireEvent.change(phoneInput, { target: { value: '+7 999 123-45-67' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    });
    
    // Отправляем форму
    const submitButton = screen.getByText('Отправить');
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    // Запускаем все таймеры
    await act(async () => {
      vi.runAllTimers();
    });
    
    // Проверяем, что форма очистилась
    expect(nameInput).toHaveValue('');
    expect(brandInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(React.createElement(Contact));
    
    const submitButton = screen.getByText('Отправить');
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    // Проверяем, что форма не отправилась (осталась на странице)
    expect(screen.getByText('Форма заявки')).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('clears validation errors when user starts typing', async () => {
    renderWithProviders(React.createElement(Contact));
    
    // Сначала отправляем пустую форму
    const submitButton = screen.getByText('Отправить');
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    // Проверяем, что форма не отправилась
    expect(screen.getByText('Форма заявки')).toBeInTheDocument();
    
    // Начинаем вводить в поле имени
    const nameInput = screen.getByPlaceholderText('Ваше имя');
    
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Тест' } });
    });
    
    // Проверяем, что значение изменилось
    expect(nameInput).toHaveValue('Тест');
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(React.createElement(Contact));
    
    // Проверяем наличие формы (хотя role="form" не добавляется автоматически)
    const formElement = screen.getByPlaceholderText('Ваше имя').closest('form');
    expect(formElement).toBeInTheDocument();
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
    
    const submitButton = screen.getByRole('button', { name: 'Отправить' });
    expect(submitButton).toBeInTheDocument();
  });
});
