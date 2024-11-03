import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

import { expect } from 'vitest';
import {
  FullScreenError,
  FullScreenErrorProps,
} from '@/shared/components/full-screen-error/full-screen-error.tsx';

describe('ui/FullscreenError', () => {
  const closeFn = vi.fn();

  const props: FullScreenErrorProps = {
    error: 'test-error',
    onClose: closeFn,
  };

  render(<FullScreenError {...props} />);
  const modal = screen.getByLabelText('modal-window');
  const errorText = screen.getByText('test-error');

  it('should be render correctly', async () => {
    expect(modal).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });

  it('should be closed by click', async () => {
    await waitFor(() => {
      userEvent.click(modal);
    });

    expect(modal).not.toBeInTheDocument();
  });
});
