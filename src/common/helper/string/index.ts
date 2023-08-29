export const isHttpsURL = (inputString: string) => {
  if (!inputString) return false;
  return inputString.startsWith('https://');
};
