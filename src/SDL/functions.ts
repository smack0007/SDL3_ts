import { bool } from "../types.ts";
import { InitFlags } from "./enums.ts";

const dylib = Deno.dlopen("/usr/local/lib64/libSDL3.so", {
  SDL_Init: { parameters: ["i32"], result: "bool" },
  SDL_SetAppMetadata: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "bool",
  },
} as const);

function stringToPointer(value: string): Deno.PointerValue {
  return Deno.UnsafePointer.of(new TextEncoder().encode(value + "\0"));
}

export function Init(flags: InitFlags): bool {
  return dylib.symbols.SDL_Init(flags);
}

export function SetAppMetadata(
  appname: string,
  appversion: string,
  appidentifier: string
): bool {
  return dylib.symbols.SDL_SetAppMetadata(
    stringToPointer(appname),
    stringToPointer(appversion),
    stringToPointer(appidentifier)
  );
}
