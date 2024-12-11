import { copy, readerFromStreamReader } from "@std/io";

export function chdir(directory: string): void {
  Deno.chdir(directory);
}

interface ExecOptions {
  doNotThrowOnFailure?: boolean;
}

interface ExecResult {
  code: number;
  success: boolean;
}

export async function exec(
  args: [string, ...string[]],
  options: ExecOptions = {}
): Promise<ExecResult> {
  const command = new Deno.Command(args[0], {
    args: args.slice(1),
    stdout: "piped",
    stderr: "piped",
  }).spawn();

  copy(readerFromStreamReader(command.stdout.getReader()), Deno.stdout);
  copy(readerFromStreamReader(command.stderr.getReader()), Deno.stderr);

  const commandStaus = await command.status;

  if (!commandStaus.success && !options.doNotThrowOnFailure) {
    throw new Error(
      `Command '${args.join(" ")}' failed with code ${commandStaus.code}.`
    );
  }

  return {
    ...commandStaus,
  };
}
