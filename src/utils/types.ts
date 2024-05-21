export function isString(params: Record<string, string> | string): params is string {
  return typeof params === 'string';
}
