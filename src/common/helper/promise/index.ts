export async function raceWithTimeout<T>(
  promises: Promise<T>[],
  timeout: number,
): Promise<T> {
  const timeoutPromise = new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout after ${timeout} milliseconds`));
    }, timeout);
  });

  return Promise.race([...promises, timeoutPromise]);
}
