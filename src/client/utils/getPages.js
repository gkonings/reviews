const getPages = (totalPages, page) => {
  const maxLength = 7;

  const range = (start, end) => {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  };

  const sideWidth = maxLength < 9 ? 1 : 2;

  const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1; // eslint-disable-line no-bitwise
  const rightWidth = (maxLength - sideWidth * 2 - 2) >> 1; // eslint-disable-line no-bitwise
  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }
  // Breaks on both sides
  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
};

export default getPages;
