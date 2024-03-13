export const expiredTime = (expired: number) => {
  const currentTime = new Date(Date.now());
  currentTime.setSeconds(currentTime.getSeconds() + expired);
  return currentTime.valueOf();
};

export const getCurrentTimestamp = () => {
  const now = new Date();
  return now.getTime();
};

export const getYear = (date: string) => {
  if (!date) return;
  return new Date(date).getFullYear();
};
