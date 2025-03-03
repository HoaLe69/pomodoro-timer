"use client";
import { useCallback, useState } from "react";
import PomodoroTimerSettingModal from "./pomodoro-setting-modal";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = useCallback((t: boolean) => {
    setOpen(t);
  }, []);

  return (
    <header className="py-2 flex items-center justify-between">
      <h1 className="scroll-m-20 text-2xl font-bold tracking-wide">
        Stay Productive 🕓
      </h1>
      <PomodoroTimerSettingModal open={open} onOpenChange={handleOpenModal} />
    </header>
  );
}
