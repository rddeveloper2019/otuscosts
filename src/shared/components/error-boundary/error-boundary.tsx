import { Component, ErrorInfo, ReactNode } from 'react';
import { TextButton } from '@/shared/components/text-button';
import { TextButtonState } from '@/shared/components/text-button/types.ts';

// Определяем интерфейсы для пропсов и состояния
type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error; // Состояние наличия ошибки
  errorInfo?: ErrorInfo;
};

// Создаем класс ErrorBoundary
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false, error: undefined, errorInfo: undefined }; // Инициализируем состояние
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });

    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  defaultOverlay = (error?: Error, errorInfo?: ErrorInfo) => (
    <div style={{ padding: 20, width: 'fit-content' }}>
      <h2>Вы что-то сломали: </h2>
      <div style={{ whiteSpace: 'pre-line' }}>
        <p>{error?.message}</p>
        <p>{errorInfo?.componentStack?.trim()}</p>
        <TextButton
          state={TextButtonState.SECONDARY}
          handleClick={() => (window.location.href = '/')}
          type="button"
        >
          🔄 Перезагрузить страницу
        </TextButton>
      </div>
    </div>
  );

  render() {
    const { error, errorInfo, hasError } = this.state;
    if (hasError) {
      return this.defaultOverlay(error, errorInfo);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
