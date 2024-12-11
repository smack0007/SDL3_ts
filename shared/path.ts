import {
  basename as denoBasename,
  join as denoJoin,
  resolve as denoResolve,
} from "@std/path";

export function basename(path: string, suffix?: string): string {
  return denoBasename(path, suffix);
}

export function join(parts: string[]): string {
  return denoJoin(...parts);
}

export function resolve(parts: string | string[]): string {
  if (typeof parts === "string") {
    return denoResolve(parts);
  } else {
    return denoResolve(...parts);
  }
}
