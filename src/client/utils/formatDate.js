const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default formatDate;
