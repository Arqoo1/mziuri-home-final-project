import { useState, useEffect, useRef } from 'react';

/**
 * @param {number} durationMs
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */
export default function useCountdown(durationMs) {
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const targetRef = useRef(Date.now() + durationMs);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = targetRef.current - now;
      if (diff <= 0) {
        targetRef.current = now + durationMs;
        setTimeLeft(durationMs);
      } else {
        setTimeLeft(diff);
      }
    };

    const intervalId = setInterval(tick, 1000);
    tick();

    return () => clearInterval(intervalId);
  }, [durationMs]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
