export function split(
  value: string,
  seperators: [string, ...string[]]
): string[] {
  const regex = new RegExp(
    "[" + seperators.map((ch) => `\\${ch}`).join("") + "]"
  );
  return value.split(regex);
}
