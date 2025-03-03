import { createContext, useCallback, useState } from "react";

type IPomodoroTimerContext = {
  pomodoroSession: number;
  updatePomodoroSession: (timer: number) => void;
};

export const PomodoroTimerContext = createContext<IPomodoroTimerContext>({
  pomodoroSession: 25 * 60,
  updatePomodoroSession: (timer: number) => {},
});

const PomodoroTimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [pomodoroSession, setPomodoroSession] = useState<number>(25 * 60);

  const updatePomodoroSession = useCallback((timer: number) => {
    setPomodoroSession(timer);
  }, []);

  return (
    <PomodoroTimerContext.Provider
      value={{ pomodoroSession, updatePomodoroSession }}
    >
      {children}
    </PomodoroTimerContext.Provider>
  );
};

export default PomodoroTimerProvider;
