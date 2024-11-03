import { CardPropsType } from '@/shared/components/card';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { CardWithObserver } from '@/shared/components/card';

describe('ui/CardWithObserver', () => {
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
  const props: CardPropsType = {
    className: 'test-card',
    children: <input aria-label="test-input" />,
    onClick: clickFn,
  };

  it('should be render correctly', () => {
    const { container } = render(<CardWithObserver {...props} />);
    const card = container.querySelector('.test-card');
    const child = screen.getByLabelText('test-input');
    expect(card).toBeInTheDocument();
    expect(child).toBeInTheDocument();
    fireEvent.click(card as Element);
    expect(clickFn).toBeCalled();
  });
});
