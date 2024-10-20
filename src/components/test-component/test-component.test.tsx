import { render, screen } from '@testing-library/react';
import { TestComponent } from '@/components/test-component/test-component.tsx';

describe('TestComponent', () => {
  it('renders correctly', () => {
    render(<TestComponent />);
    screen.debug();
    const testComponent = screen.getByText(/test component/i);
    expect(testComponent).toBeInTheDocument();
  });
});
