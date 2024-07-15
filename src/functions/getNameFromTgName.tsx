export function getFullName(
  firstName: string,
  lastName?: string | null
): string {
  const firstNameParts = firstName.trim().split(/\s+/);

  if (firstNameParts.length >= 2) {
    return firstName;
  }

  if (lastName) {
    return `${firstName} ${lastName}`;
  }

  return firstName;
}
