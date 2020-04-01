import { getReviewWeight } from './_util';

describe('getReviewWeight', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2019-04-01T08:00:00.000Z').valueOf());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 1 on a recent review (< 1yr)', () => {
    const review = {
      entryDate: 1549051233000,
    };

    const result = getReviewWeight(review);

    expect(result).toBe(1);
  });

  it('should return 0.9 on a year old review', () => {
    const review = {
      entryDate: 1522612833000,
    };

    const result = getReviewWeight(review);

    expect(result).toBe(0.9);
  });

  it('should return 0.5 on old reviews (> 5yr)', () => {
    const review = {
      entryDate: 1252359116000,
    };

    const result = getReviewWeight(review);

    expect(result).toBe(0.5);
  });
});
