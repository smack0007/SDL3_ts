import { SDL } from "SDL3_ts";

function main(): void {
  SDL.SetAppMetadata(
    "Example Renderer Clear",
    "1.0",
    "com.example.renderer-clear"
  );

  const result = SDL.Init(SDL.InitFlags.VIDEO);

  console.info("SDL_Init", result);
}

try {
  main();
} catch (error) {
  console.error(error);
}
