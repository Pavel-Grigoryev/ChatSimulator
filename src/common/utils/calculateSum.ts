export const calculateSum = (arr: any[], str: string) =>
  arr.reduce((acc, currentVal) => acc + currentVal[str], 0);
