"use client";
import { Separator } from "@/components/ui/separator";
import { useState, useCallback } from "react";
import PomodoroTaskItem from "./pomodoro-task-item";
import { Button } from "./ui/button";
import { PlusCircle, ChevronUp, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import PomodoroTaskForm from "./pomodoro-task-form";
import { ITaskEditedInfo } from "@/lib/types";

interface Task {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "completed";
  estPomodoro: 1;
}

export default function PomodoroTask() {
  const [taskInfo, setTaskInfo] = useState<Task>({
    id: "",
    title: "",
    estPomodoro: 1,
    status: "todo",
  });
  const [openAddingTask, setOpenAddingTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Complete project documentation",
      status: "todo",
      estPomodoro: 1,
    },
    {
      id: "task-2",
      title: "Design user interface",
      status: "inprogress",
      estPomodoro: 1,
    },
    {
      id: "task-3",
      title: "Research competitors",
      status: "completed",
      estPomodoro: 1,
    },
  ]);

  const handleToggleAddingTask = useCallback(() => {
    setOpenAddingTask(!openAddingTask);
  }, [openAddingTask]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskInfo((pre) => ({ ...pre, [name]: value }));
  }, []);

  const handleCreateTask = useCallback(() => {
    if (!taskInfo.title) return;

    taskInfo.id = uuidv4();
    setTasks((pre) => [...pre, taskInfo]);
    setTaskInfo((pre) => ({ ...pre, title: "", estPomodoro: 1, id: "" }));
  }, [taskInfo]);

  const handleEditTask = useCallback((taskEditedInfo: ITaskEditedInfo) => {
    //@ts-ignore
    setTasks((preTasks) => {
      return preTasks.map((task) => {
        if (task.id === taskEditedInfo.id) {
          return { ...task, ...taskEditedInfo };
        }
        return task;
      });
    });
  }, []);

  const handleDeleteTask = useCallback((id: string) => {
    if (!id) return;
    setTasks((pre) => pre.filter((task) => task.id !== id));
  }, []);

  return (
    <div className="max-w-[500px] mx-auto pt-4">
      <h2 className="text-xl font-semibold">Tasks 🐻</h2>
      <Separator />
      {tasks.map((task) => (
        <PomodoroTaskItem
          id={task.id}
          key={task.id}
          status={task.status}
          title={task.title}
          estPomodoro={task.estPomodoro}
          onEdit={handleEditTask}
          onDelete={() => handleDeleteTask(task.id)}
        />
      ))}
      {openAddingTask ? (
        <PomodoroTaskForm
          onChange={handleChange}
          onToggle={handleToggleAddingTask}
          taskInfo={taskInfo}
          onSave={handleCreateTask}
        />
      ) : (
        <Button onClick={handleToggleAddingTask} className="w-full mt-2">
          <PlusCircle />
          Add task
        </Button>
      )}
    </div>
  );
}
