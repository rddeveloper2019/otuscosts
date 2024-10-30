import { Component, ErrorInfo, ReactNode } from 'react';

// Определяем интерфейсы для пропсов и состояния
type ErrorBoundaryProps = {
  children: ReactNode;
  overlay?: ({ element }: { element?: ReactNode }) => ReactNode; // Дочерние компоненты
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error; // Состояние наличия ошибки
};

// Создаем класс ErrorBoundary
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false, error: undefined }; // Инициализируем состояние
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error });

    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  defaultOverlay = () => <h1>Вы что-то сломали.</h1>;

  render() {
    const { error } = this.state;

    const element = <h1>{error?.message || 'Вы что-то сломали'}</h1>;

    if (this.state.hasError) {
      return this.props?.overlay?.({ element }) || this.defaultOverlay();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
