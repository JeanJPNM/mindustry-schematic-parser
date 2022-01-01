export function basicJoin(...parts: string[]): string {
  return parts.join('/').replace(/\/+/g, '/')
}
