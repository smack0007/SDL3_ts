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
