"use client";
import { Button } from "@/components/ui/button";
import { PomodoroTimerContext } from "@/lib/pomodoro-timer-provider";
import { useState, useEffect, useCallback, useContext } from "react";

export default function PomodoroTimer() {
  const { pomodoroSession } = useContext(PomodoroTimerContext);
  const [timeLeft, setTimeLeft] = useState<number>(pomodoroSession);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((pre) => pre - 1);
      }, 1000);
    } else if (timeLeft == 0) {
      setIsRunning(false);
    }
    return () => {
      return clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    setTimeLeft(pomodoroSession);
  }, [pomodoroSession]);

  const handleRun = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="py-20 flex">
        <span className="select-none text-8xl flex items-center font-extrabold">
          {formatTime(timeLeft)}
        </span>
      </div>
      <Button size="lg" onClick={handleRun}>
        {isRunning ? "Pause" : "Start"}
      </Button>
    </div>
  );
}
