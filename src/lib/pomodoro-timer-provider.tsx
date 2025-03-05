import { createContext, useCallback, useEffect, useState } from "react";
import type { ICurrentPomodoroSession } from "@/lib/types";

type ITimeDurations = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
};
type IPomodoroTimerContext = {
  currentPomodoroSession: ICurrentPomodoroSession;
  timeDurations: ITimeDurations;
  totalPomodoroSession: number;
  onPomodoroTimerEnd: () => void;
  onChangeTimeDurations: (timeDurations: ITimeDurations) => void;
  onPomodoroChangeSession: (session: ICurrentPomodoroSession) => void;
};

const TIME_DURATIONS_DEFAULT = {
  pomodoro: 40,
  shortBreak: 5,
  longBreak: 15,
};
export const PomodoroTimerContext = createContext<IPomodoroTimerContext>({
  currentPomodoroSession: "pomodoro",
  timeDurations: TIME_DURATIONS_DEFAULT,
  totalPomodoroSession: 0,
  onPomodoroTimerEnd: () => {},
  onChangeTimeDurations: () => {},
  onPomodoroChangeSession: () => {},
});

const PomodoroTimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [timeDurations, setTimeDurations] = useState(TIME_DURATIONS_DEFAULT);
  const [totalPomodoroSession, setTotalPomodoroSection] = useState<number>(0);
  const [currentPomodoroSession, setCurrentPomodoroSession] =
    useState<ICurrentPomodoroSession>("pomodoro");

  const onPomodoroChangeSession = useCallback(
    (session: ICurrentPomodoroSession) => {
      if (!session) return;
      setCurrentPomodoroSession(session);
    },
    [],
  );

  const onChangeTimeDurations = useCallback((timeDurations: ITimeDurations) => {
    setTimeDurations(timeDurations);
  }, []);

  const onPomodoroTimerEnd = useCallback(() => {
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

  return (
    <PomodoroTimerContext.Provider
      value={{
        timeDurations,
        currentPomodoroSession,
        totalPomodoroSession,
        onPomodoroTimerEnd,
        onChangeTimeDurations,
        onPomodoroChangeSession,
      }}
    >
      {children}
    </PomodoroTimerContext.Provider>
  );
};

export default PomodoroTimerProvider;
