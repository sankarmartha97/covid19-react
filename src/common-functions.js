export const formatDate = (unformattedDate) => {
  const year = unformattedDate.slice(0, 4);
  const month = unformattedDate.slice(5, 7);
  const day = unformattedDate.slice(8, 10);
  const time = unformattedDate.slice(11);
  return `${year}-${month}-${day}T${time}+05:30`;
};
