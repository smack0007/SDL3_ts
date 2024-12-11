import { copy, readerFromStreamReader } from "@std/io";

export function chdir(directory: string): void {
  Deno.chdir(directory);
}

interface ExecOptions {
  doNotThrowOnFailure?: boolean;
  captureOutput?: boolean;
}

interface ExecResult {
  code: number;
  success: boolean;
  stdout: string;
  stderr: string;
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

  let result: {
    code: number;
    success: boolean;
    stdout?: Uint8Array;
    stderr?: Uint8Array;
  };

  if (!options.captureOutput) {
    copy(readerFromStreamReader(command.stdout.getReader()), Deno.stdout);
    copy(readerFromStreamReader(command.stderr.getReader()), Deno.stderr);
    result = await command.status;
  } else {
    result = await command.output();
  }

  if (!result.success && !options.doNotThrowOnFailure) {
    throw new Error(
      `Command '${args.join(" ")}' failed with code ${result.code}.`
    );
  }

  return {
    code: result.code,
    success: result.success,
    stdout: options.captureOutput
      ? new TextDecoder().decode(result.stdout)
      : "",
    stderr: options.captureOutput
      ? new TextDecoder().decode(result.stderr)
      : "",
  };
}

export function exit(code: number = 0): void {
  Deno.exit(code);
}
