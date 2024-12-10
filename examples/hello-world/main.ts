import { SDL } from "SDL3_ts";

function main(): void {
  const result = SDL.Init(SDL.InitFlags.VIDEO);

  console.info("SDL_Init", result);
}

try {
  main();
} catch (error) {
  console.error(error);
}
