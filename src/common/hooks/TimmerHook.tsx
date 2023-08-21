import { useState, useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';

export default function useTimer() {
  const [timerCount, setTimer] = useState(0);
  let interval: any;
  const resetTimer = (time: number, start: boolean) => {
    setTimer(time);
    if (start) {
      // Start a timer that runs continuous after X milliseconds
      interval = BackgroundTimer.setInterval(() => {
        setTimer(lastTimerCount => {
          if (lastTimerCount <= 1) {
            BackgroundTimer.clearInterval(interval);
            return 0;
          }
          return lastTimerCount - 1;
        });
      }, 1000);

      // Cancel the timer when you are done with it
    }
  };

  useEffect(() => {
    return () => BackgroundTimer.clearInterval(interval);
  }, []);

  return [timerCount, resetTimer] as any;
}
