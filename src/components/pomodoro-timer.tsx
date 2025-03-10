"use client";
import { Button } from "@/components/ui/button";
import { PomodoroTimerContext } from "@/lib/pomodoro-timer-provider";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SECONDS_IN_MIN = 60;
export default function PomodoroTimer() {
  const {
    timeDurations,
    currentPomodoroSession,
    onPomodoroTimerEnd,
    onPomodoroChangeSession,
  } = useContext(PomodoroTimerContext);

  const [timeLeft, setTimeLeft] = useState<number>(
    timeDurations[currentPomodoroSession] * SECONDS_IN_MIN,
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((pre) => pre - 1);
      }, 1000);
    } else if (timeLeft == 0) {
      if (isRunning) {
        onPomodoroTimerEnd();
        setIsRunning(false);
        audioRef.current?.play();
      }
    }
    return () => {
      return clearInterval(timer);
    };
  }, [isRunning, timeLeft, audioRef]);

  const handleAudioEnded = useCallback(() => {
    const audioEl = audioRef.current;
    console.log("audio ended");
    if (audioEl) {
      if (currentPomodoroSession == "pomodoro") {
        audioEl.src = "/sounds/machi-no-dorufin.mp3";
      } else {
        audioEl.src = "/sounds/get-back-to-work-you-monkey.mp3";
      }
    }
  }, [audioRef, currentPomodoroSession]);
  useEffect(() => {
    setTimeLeft(timeDurations[currentPomodoroSession] * SECONDS_IN_MIN);
  }, [currentPomodoroSession, timeDurations]);

  const handleRun = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const handleTabChange = useCallback((tab: string) => {
    onPomodoroChangeSession(tab as keyof typeof timeDurations);
    setIsRunning(false);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return (
    <Card className="w-full mt-2">
      <CardContent>
        <Tabs
          value={currentPomodoroSession}
          onValueChange={handleTabChange}
          className="flex flex-col items-center"
          defaultValue="pomodoro"
        >
          <TabsList>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
          <TabsContent value={currentPomodoroSession}>
            <div className="flex flex-col items-center">
              <div className="py-20 flex">
                <span className="select-none text-8xl flex items-center font-extrabold">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="w-full text-center">
          <Button size="lg" onClick={handleRun}>
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>
      </CardContent>
      <audio
        onEnded={handleAudioEnded}
        ref={audioRef}
        src={"/sounds/machi-no-dorufin.mp3"}
      />
    </Card>
  );
}
