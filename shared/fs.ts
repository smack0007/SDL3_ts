import { walk } from "@std/fs/walk";
import { TextLineStream } from "@std/streams/text-line-stream";

export async function directoryExists(dir: string): Promise<boolean> {
  try {
    const stat = await Deno.lstat(dir);
    return stat.isDirectory;
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
    return false;
  }
}

export async function ensureDirectory(dir: string): Promise<void> {
  const { ensureDir } = await import("@std/fs");
  await ensureDir(dir);
}

export async function removeDirectory(dir: string): Promise<void> {
  await Deno.remove(dir, { recursive: true });
}

interface ListFilesOptions {
  extensions?: string[];
}

export async function listFiles(
  path: string,
  options: ListFilesOptions = {}
): Promise<string[]> {
  const results: string[] = [];
  for await (const entry of walk(path, {
    exts: options.extensions ? options.extensions : undefined,
  })) {
    results.push(entry.path);
  }
  return results;
}

export async function* readTextFileLines(path: string): AsyncIterable<string> {
  using file = await Deno.open(path);
  const lines = file.readable.pipeThrough(new TextDecoderStream()).pipeThrough(new TextLineStream());
  for await (const line of lines) {
    yield line;
  }
}

export async function writeTextFile(path: string, contents: string): Promise<void> {
  await Deno.writeTextFile(path, contents);
}
