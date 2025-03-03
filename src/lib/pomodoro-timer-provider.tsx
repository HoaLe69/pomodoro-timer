import { createContext, useCallback, useState } from "react";

type IPomodoroTimerContext = {
  pomodoroSession: number;
  totalPomodoroSession: number;
  updatePomodoroSession: (timer: number) => void;
  handlePomodoroTimerEnd: () => void;
};

export const PomodoroTimerContext = createContext<IPomodoroTimerContext>({
  pomodoroSession: 25 * 60,
  totalPomodoroSession: 0,
  updatePomodoroSession: (timer: number) => {},
  handlePomodoroTimerEnd: () => {},
});

const PomodoroTimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [pomodoroSession, setPomodoroSession] = useState<number>(25 * 60);
  const [totalPomodoroSession, setTotalPomodoroSection] = useState<number>(0);

  const updatePomodoroSession = useCallback((timer: number) => {
    setPomodoroSession(timer);
  }, []);

  const handlePomodoroTimerEnd = useCallback(() => {
    setTotalPomodoroSection((pre) => pre + 1);
  }, []);

  return (
    <PomodoroTimerContext.Provider
      value={{
        pomodoroSession,
        totalPomodoroSession,
        updatePomodoroSession,
        handlePomodoroTimerEnd,
      }}
    >
      {children}
    </PomodoroTimerContext.Provider>
  );
};

export default PomodoroTimerProvider;
