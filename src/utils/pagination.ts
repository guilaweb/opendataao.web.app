export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getPageCount(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}
