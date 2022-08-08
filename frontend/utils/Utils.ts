/*
  Java-like sleep function UwU
*/
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const formatDate = (date: Date) => date.toISOString().slice(0, 10);
