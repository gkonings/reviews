import React from 'react';
import { render, fireEvent, act, wait } from '@testing-library/react';

import { fetchReviews } from '../services/reviewService';
import { page1, page2 } from '../services/__mocks__/data';

import Reviews from './Reviews';

jest.mock('../services/reviewService');

describe('Reviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchReviews.mockResolvedValue(page1);
  });

  it('should render', async () => {
    await act(async () => {
      const { getByText } = render(<Reviews />);
      await wait(() =>
        // data loaded
        expect(getByText('rachel abbott')).toBeInTheDocument()
      );

      expect(fetchReviews).toHaveBeenCalledTimes(1);
      expect(fetchReviews).toHaveBeenCalledWith(1, {
        filterBy: 'ALL',
        sortBy: 'entryDate',
      });
    });
  });

  it('should go to next page', async () => {
    await act(async () => {
      const { getByText, getByRole } = render(<Reviews />);
      await wait(() =>
        // data loaded
        expect(getByText('rachel abbott')).toBeInTheDocument()
      );
      jest.clearAllMocks();
      fetchReviews.mockResolvedValue(page2);

      fireEvent.click(getByRole('button', { name: '2' }));

      await wait(() =>
        // data loaded
        expect(getByText('anelies jongen')).toBeInTheDocument()
      );

      expect(fetchReviews).toHaveBeenCalledTimes(1);
      expect(fetchReviews).toHaveBeenCalledWith(2, {
        filterBy: 'ALL',
        sortBy: 'entryDate',
      });
    });
  });
});
