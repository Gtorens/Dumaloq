import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (_error: Error, _errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Генерируем уникальный ID для ошибки
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return { hasError: true, error, errorId };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку для отладки
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    }
    
    // Логируем ошибку с дополнительной информацией
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId
    };
    
    // Логируем детали ошибки для отладки
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', errorDetails);
    }
    
    // Вызываем пользовательский обработчик ошибок
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Отправляем ошибку в аналитику (если есть)
    this.reportError(error, errorInfo);
    
    this.setState({ error, errorInfo });
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // Здесь можно добавить отправку ошибок в сервисы аналитики
    // например, Sentry, LogRocket и т.д.
    try {
      // Пример отправки в Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: false,
          custom_map: {
            error_id: this.state.errorId,
            component_stack: errorInfo.componentStack
          }
        });
      }
    } catch (reportingError) {
      // Логируем ошибку репортинга только в development
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to report error:', reportingError);
      }
    }
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // Если предоставлен пользовательский fallback, используем его
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                Что-то пошло не так
              </h3>
              
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
              </p>
              
              {this.state.errorId && (
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  ID ошибки: {this.state.errorId}
                </p>
              )}
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Попробовать снова
                </button>
                
                <button
                  onClick={this.handleReload}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Обновить страницу
                </button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                    Детали ошибки (только для разработки)
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-800 dark:text-gray-200 overflow-auto">
                    <div><strong>Сообщение:</strong> {this.state.error.message}</div>
                    <div><strong>Стек:</strong> {this.state.error.stack}</div>
                    <div><strong>Компонент:</strong> {this.state.errorInfo?.componentStack}</div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
