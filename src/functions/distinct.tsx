export function distinct(array: any[]) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}
