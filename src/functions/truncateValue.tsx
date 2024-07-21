export const truncateValue = (value: string): string => {
  if (value.length > 15) {
    return value.slice(0, 12) + "...";
  }
  return value;
};
