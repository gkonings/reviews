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

export const fetchReviews = ({ page = 1 }) => {
  const limit = 5;
  const pageIndex = page - 1;
  const start = pageIndex * limit;

  return fetchResource(
    `http://localhost:3000/reviews?start=${start}&limit=${limit}`
  );
};

export const fetchAverage = () =>
  fetchResource(`http://localhost:3000/reviews/average`);

const api = {
  fetchReviews,
  fetchAverage,
};

export default api;
