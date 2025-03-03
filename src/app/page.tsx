"use client";
import Header from "@/components/header";
import PomodoroTimer from "@/components/pomodoro-timer";
import PomodoroTask from "@/components/pomodoro-task";
import { Separator } from "@/components/ui/separator";

import PomodoroTimerProvider from "@/lib/pomodoro-timer-provider";

export default function Home() {
  return (
    <PomodoroTimerProvider>
      <div className="h-screen w-screen bg-zinc-950 text-zinc-50">
        <div className="max-w-3xl mx-auto">
          <Header />
          <Separator />
          <PomodoroTimer />
          <PomodoroTask />
        </div>
      </div>
    </PomodoroTimerProvider>
  );
}
