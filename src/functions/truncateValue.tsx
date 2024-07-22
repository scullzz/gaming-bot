export const truncateValue = (value: string, length: number = 15): string => {
  const end = "...";
  if (value.length > length) {
    return value.slice(0, length - end.length) + end;
  }
  return value;
};
