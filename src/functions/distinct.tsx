export function distinct(array: any[]) {
  return array.filter((value, index, self) => self.indexOf(value) === index);
}
export function hasDuplicates<T>(array: T[]): boolean {
  const uniqueElements = new Set(array);
  return uniqueElements.size !== array.length;
}
