import { join as stdJoin } from "@std/path";

export function join(parts: string[]): string {
  return stdJoin(...parts);
}
