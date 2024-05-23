import { get } from "svelte/store";
import { maxError, persistError, wrongChars, wrongCount } from "../stores/textstore";

export const wrongCharUtils = () => {
  function add(charIndex) {
    wrongChars.update((w) => w.add(charIndex));
  }
  function remove(charIndex) {
    wrongChars.update((w) => {
      w.delete(charIndex);
      return w;
    });
  }
  function clear() {
    wrongCount.set(0)
    wrongChars.set(new Set([]));
  }
  function count() {
    return get(wrongCount);
  }
  function has(i) {
    return get(wrongChars).has(i);
  }
  function inc() {
    wrongCount.update((v) => v + 1);
  }
  return { add, clear, count, has, inc, remove };
};

export function setMaxError(errorStr) {
  errorStr = errorStr.trim();
  if (errorStr.toLowerCase() === "default") {
    maxError.set(defaultMaxError);
    persistError.set(false);
    return;
  }
  let arr = errorStr.split("%");
  let errorPct = parseFloat(arr[0]) / 100;
  let persistent = arr.length > 1 && arr[1] === "*";
  maxError.set(errorPct);
  persistError.set(persistent);
}