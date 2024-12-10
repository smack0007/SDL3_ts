import { Enum, Flags } from "../types.ts";
import * as $ from "./_native.ts";

export const App = {
  CONTINUE: $.SDL_APP_CONTINUE,
  FAILURE: $.SDL_APP_FAILURE,
  SUCCESS: $.SDL_APP_SUCCESS,
};
export type App = Enum<typeof App>;

export const InitFlags = {
  AUDIO: $.SDL_INIT_AUDIO,
  VIDEO: $.SDL_INIT_VIDEO,
  JOYSTICK: $.SDL_INIT_JOYSTICK,
  HAPTIC: $.SDL_INIT_HAPTIC,
  GAMEPAD: $.SDL_INIT_GAMEPAD,
  EVENTS: $.SDL_INIT_EVENTS,
  SENSOR: $.SDL_INIT_SENSOR,
  CAMERA: $.SDL_INIT_CAMERA,
} as const;
export type InitFlags = Flags<typeof InitFlags, "InitFlags">;
