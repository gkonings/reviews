const fetchResource = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const json = await response.json();
  return json;
};

export const fetchReviews = (page = 1, { filterBy, sortBy }) => {
  const limit = 5;
  const pageIndex = page - 1;
  const start = pageIndex * limit;
  const filterString =
    filterBy && filterBy !== 'ALL' ? `&filterBy=${filterBy}` : '';
  const sortString = sortBy ? `&sortBy=${sortBy}` : '';

  return fetchResource(
    `http://localhost:3000/reviews?start=${start}&limit=${limit}${filterString}${sortString}`
  );
};

export const fetchAverage = () =>
  fetchResource(`http://localhost:3000/reviews/average`);

const api = {
  fetchReviews,
  fetchAverage,
};

export default api;
