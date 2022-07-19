/*
  Java-like sleep function UwU
*/
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
