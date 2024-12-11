import { TMP_PATH } from "../shared/constants.ts";
import {
  directoryExists,
  ensureDirectory,
  removeDirectory,
} from "../shared/fs.ts";
import { chdir, exec, exit } from "../shared/process.ts";

const BUILD_DIR = "build";

const SDL_REPO = "https://github.com/libsdl-org/SDL.git";
const SDL_BRANCH = "preview-3.1.6";
const SDL_DIR = "SDL";

async function main(): Promise<void> {
  await ensureDirectory(TMP_PATH);
  chdir(TMP_PATH);

  if (await directoryExists(SDL_DIR)) {
    await removeDirectory(SDL_DIR);
  }

  await exec([
    "git",
    "clone",
    "-b",
    SDL_BRANCH,
    "--depth",
    "1",
    SDL_REPO,
    SDL_DIR,
  ]);
  chdir(SDL_DIR);

  await ensureDirectory(BUILD_DIR);
  chdir(BUILD_DIR);

  await exec(["cmake", "-DCMAKE_BUILD_TYPE=Release", ".."]);
  await exec(["cmake", "--build", ".", "--config", "Release", "--parallel"]);
  await exec(["sudo", "cmake", "--install", ".", "--config", "Release"]);
}

try {
  await main();
} catch (error) {
  console.error(error);
  exit(1);
}
