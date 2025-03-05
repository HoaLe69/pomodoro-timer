"use client";
import { Separator } from "@/components/ui/separator";
import { useState, useCallback, useEffect, useContext } from "react";
import PomodoroTaskItem from "./pomodoro-task-item";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import PomodoroTaskForm from "./pomodoro-task-form";
import { ITask, ITaskEditedInfo } from "@/lib/types";
import { PomodoroTimerContext } from "@/lib/pomodoro-timer-provider";

export default function PomodoroTask() {
  const { totalPomodoroSession } = useContext(PomodoroTimerContext);
  const [taskInfo, setTaskInfo] = useState({
    id: "",
    title: "",
    estPomodoro: 1,
    progress: 0,
    status: "todo",
  });
  const [openAddingTask, setOpenAddingTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: "task-1",
      title: "Complete project documentation",
      status: "todo",
      estPomodoro: 1,
      progress: 0,
    },
    {
      id: "task-2",
      title: "Design user interface",
      status: "inprogress",
      estPomodoro: 1,
      progress: 0,
    },
    {
      id: "task-3",
      title: "Research competitors",
      status: "completed",
      estPomodoro: 1,
      progress: 0,
    },
  ]);

  useEffect(() => {
    if (!totalPomodoroSession) return;
    //@ts-ignore
    setTasks((preTasks) => {
      return preTasks.map((task) => {
        if (task.status === "inprogress") {
          return { ...task, progress: task.progress + 1 };
        }
        return task;
      });
    });
  }, [totalPomodoroSession]);

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
    //@ts-ignore
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

  const markAsComplete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      if (!id) return;
      e.stopPropagation();

      setTasks((preTasks) => {
        return preTasks.map((task) => {
          if (task.id == id) return { ...task, status: "completed" };
          return task;
        });
      });
    },
    [],
  );

  const handleSelectCurrentTask = useCallback((id: string, status: string) => {
    if (!id) return;
    if (status === "completed" || status === "inprogress") return;
    setTasks((preTasks) => {
      return preTasks.map((task) => {
        if (task.id == id) return { ...task, status: "inprogress" };
        if (task.status == "inprogress") return { ...task, status: "todo" };
        return task;
      });
    });
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
          progress={task.progress}
          estPomodoro={task.estPomodoro}
          onEdit={handleEditTask}
          onPriorityTask={() => handleSelectCurrentTask(task.id, task.status)}
          onComplete={(e) => markAsComplete(e, task.id)}
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
