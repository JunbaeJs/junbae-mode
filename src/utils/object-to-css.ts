export function objectToCssString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}
