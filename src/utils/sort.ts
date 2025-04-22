export type SortDirection = 'asc' | 'desc';

export function sortArray<T>(arr: T[], key: keyof T, direction: SortDirection): T[] {
  return [...arr].sort((a, b) => {
    if (a[key] === undefined || b[key] === undefined) return 0;
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return direction === 'asc' ? (a[key] as number) - (b[key] as number) : (b[key] as number) - (a[key] as number);
    }
    return direction === 'asc'
      ? String(a[key]).localeCompare(String(b[key]))
      : String(b[key]).localeCompare(String(a[key]));
  });
}
