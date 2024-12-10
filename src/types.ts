declare const _: unique symbol;

export type bool = boolean;

export type Enum<T extends Record<string, number>> = T[keyof T];

export type Flags<T extends Record<string, number>, Name extends string> =
  | {
      [K in keyof T]: { [_]: Name } & T[K];
    }[keyof T]
  | number;
