// atoms/hintProgressState.ts
import { atom } from "recoil";

export const hintProgressState = atom<number>({
  key: "hintProgressState",
  default: 0,
});

export const foundLinesState = atom<string[][]>({
  key: "foundLinesState",
  default: [],
});

export const hintState = atom<string[]>({
  key: "hintState",
  default: [],
});

export const foundWords = atom<string[]>({
  key: "foundWords",
  default: [],
});
