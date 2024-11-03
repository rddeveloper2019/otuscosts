import { Card, CardPropsType } from '@/shared/components/card';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';

import { expect } from 'vitest';

describe('ui/Card', () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  const clickFn = vi.fn();
  const CardProps: CardPropsType = {
    className: 'test-card',
    children: <input aria-label="test-input" />,
    onClick: clickFn,
  };

  it('should be render correctly', () => {
    const { container } = render(<Card {...CardProps} />);
    const card = container.querySelector('.test-card');
    const child = screen.getByLabelText('test-input');
    expect(card).toBeInTheDocument();
    expect(child).toBeInTheDocument();
    fireEvent.click(card as Element);
    expect(clickFn).toBeCalled();
  });
});
