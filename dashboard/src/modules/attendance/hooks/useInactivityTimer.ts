import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInactivityTimerProps {
  timeoutMs: number;
  onIdle: () => void;
  onActive: () => void;
  isActive: boolean; // Is the tracking currently enabled (e.g., only if checked-in and not already paused)
}

export const useInactivityTimer = ({
  timeoutMs,
  onIdle,
  onActive,
  isActive,
}: UseInactivityTimerProps) => {
  const [isIdle, setIsIdle] = useState(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const handleActivity = useCallback(() => {
    console.log("handleActivity")
    if (!isActive) return;

    // If we were previously idle and now there's activity, trigger resume
    if (isIdle) {
      setIsIdle(false);
      onActive();
    }

    // Reset the idle timer
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }
    idleTimer.current = setTimeout(() => {
      setIsIdle(true);
      onIdle();
    }, timeoutMs);
  }, [isActive, isIdle, onActive, onIdle, timeoutMs]);
  console.log("isActive", isActive)
  useEffect(() => {
    if (!isActive) {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      return;
    }

    // Initialize timer on mount or when becoming active
    if (!idleTimer.current && !isIdle) {
      idleTimer.current = setTimeout(() => {
        setIsIdle(true);
        onIdle();
      }, timeoutMs);
    }

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [handleActivity, isActive, isIdle, onIdle, timeoutMs]);

  return { isIdle };
};
