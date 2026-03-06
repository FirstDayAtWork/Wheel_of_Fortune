export function filterByValues<T, K extends keyof T>(values: T[K][], key: K, list: T[]) {
  return list.filter((item) => !values.includes(item[key]));
}
