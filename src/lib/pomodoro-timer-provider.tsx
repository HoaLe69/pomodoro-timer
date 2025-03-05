import { createContext, useCallback, useEffect, useState } from "react";
import type { ICurrentPomodoroSession } from "@/lib/types";

type IPomodoroTimerContext = {
  currentPomodoroSession: ICurrentPomodoroSession;
  pomodoroSession: number;
  totalPomodoroSession: number;
  updatePomodoroSession: (timer: number) => void;
  handlePomodoroTimerEnd: () => void;
};

export const PomodoroTimerContext = createContext<IPomodoroTimerContext>({
  currentPomodoroSession: "pomodoro",
  pomodoroSession: 25 * 60,
  totalPomodoroSession: 0,
  updatePomodoroSession: (timer: number) => {},
  handlePomodoroTimerEnd: () => {},
});

const PomodoroTimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [pomodoroSession, setPomodoroSession] = useState<number>(25 * 60);
  const [totalPomodoroSession, setTotalPomodoroSection] = useState<number>(0);
  const [currentPomodoroSession, setCurrentPomodoroSession] =
    useState<ICurrentPomodoroSession>("pomodoro");

  const updatePomodoroSession = useCallback((timer: number) => {
    setPomodoroSession(timer);
  }, []);

  const handlePomodoroTimerEnd = useCallback(() => {
    const isLongBreak = (totalPomodoroSession + 1) % 4 === 0;

    if (currentPomodoroSession == "pomodoro") {
      setCurrentPomodoroSession(isLongBreak ? "longBreak" : "shortBreak");
    } else {
      setCurrentPomodoroSession("pomodoro");
    }

    if (currentPomodoroSession == "pomodoro") {
      setTotalPomodoroSection((pre) => pre + 1);
    }
  }, [currentPomodoroSession, totalPomodoroSession]);

  useEffect(() => {
    let duration;
    if (currentPomodoroSession == "shortBreak") {
      duration = 5 * 60;
    } else if (currentPomodoroSession == "longBreak") {
      duration = 15 * 60;
    } else {
      duration = 25 * 60;
    }
    setPomodoroSession(duration);
  }, [currentPomodoroSession]);

  return (
    <PomodoroTimerContext.Provider
      value={{
        pomodoroSession,
        currentPomodoroSession,
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
