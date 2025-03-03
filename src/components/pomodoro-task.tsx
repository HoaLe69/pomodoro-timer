"use client";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import PomodoroTaskItem from "./pomodoro-task-item";
import { Button } from "./ui/button";
import { PlusCircle, ChevronUp, ChevronDown } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "completed";
}

export default function PomodoroTask() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Complete project documentation",
      status: "todo",
    },
    {
      id: "task-2",
      title: "Design user interface",
      status: "inprogress",
    },
    {
      id: "task-3",
      title: "Research competitors",
      status: "completed",
    },
  ]);
  return (
    <div className="max-w-[500px] mx-auto pt-4">
      <h2 className="text-xl font-semibold">Tasks 🐻</h2>
      <Separator />

      {tasks.map((task) => (
        <PomodoroTaskItem
          key={task.id}
          status={task.status}
          id={task.id}
          title={task.title}
        />
      ))}
      <div className="py-4 px-4 bg-zinc-900 my-2 rounded-md">
        <input
          className="w-full bg-transparent outline-none font-semibold text-xl italic"
          placeholder="What are you working on ?"
        />
        <span className="text-sm font-bold text-gray-400">Ets Pomodoros</span>
        <div className="flex items-center">
          <input
            type="number"
            step={1}
            className="max-w-20 bg-transparent border rounded-md p-1 appearance-none mt-1 border-gray-600"
          />
          <Button className="p-1 mx-2 h-full border border-gray-600 hover:opacity-80">
            <ChevronUp />
          </Button>
          <Button className="p-1 h-full border border-gray-600 hover:opacity-80">
            <ChevronDown />
          </Button>
        </div>
      </div>
      <Button className="w-full mt-2">
        <PlusCircle />
        Add task
      </Button>
    </div>
  );
}
