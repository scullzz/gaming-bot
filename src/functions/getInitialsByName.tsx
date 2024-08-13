import { Initials } from "./getInitials";

function getInitialsByName(name: string): string {
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase();
  }
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
}
function stringToColor(str: string): string {
  const baseColor = { r: 0, g: 122, b: 255 };
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }

  const variation = hash % 2;
  const r = baseColor.r;
  const g = (baseColor.g + variation) % 256;
  const b = (baseColor.b + variation) % 256;

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

export function getInitialsByNameWithColor(name: string): Initials {
  const initials = getInitialsByName(name);
  const color = stringToColor(initials);
  return { initials, color };
}
