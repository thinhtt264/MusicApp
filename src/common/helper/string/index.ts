export const isHttpsURL = (inputString: string) => {
  if (!inputString) return false;
  return inputString.startsWith('https://');
};

export const isFirebaseUrl = (inputString: string) => {
  if (!inputString) return false;
  return inputString.startsWith('https://firebasestorage');
};
