import { useEffect, useRef } from "react";

const useIdleTimer = (onIdle, timeout = 3600000) => {
  // 1 hour = 3600000 ms
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(onIdle, timeout);
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    resetTimer(); // Initialize the timer when the component mounts

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [onIdle, timeout]);

  return null;
};

export default useIdleTimer;
