import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CheckCircle, EllipsisVertical, Trash, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useState } from "react";
import PomodoroTaskForm from "./pomodoro-task-form";
import { ITaskEditedInfo, ITask } from "@/lib/types";

type TaskItemProps = ITask & {
  onEdit: (taskInfoEdited: ITaskEditedInfo) => void;
  onDelete: () => void;
  onComplete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPriorityTask: () => void;
};

export default function PomodoroTaskItem({
  id,
  title,
  status,
  onEdit,
  onDelete,
  onComplete,
  onPriorityTask,
  progress,
  estPomodoro,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskInfoEdited, setTaskInfoEdited] = useState({
    id,
    title,
    estPomodoro,
  });
  const statusStyle: Record<string, string> = {
    // todo: "bg-gray-300",
    inprogress: "bg-yellow-400",
    completed: "!bg-green-500",
  };

  const handleEdit = useCallback(() => {
    if (
      !taskInfoEdited.id ||
      (!taskInfoEdited.title && !taskInfoEdited.estPomodoro)
    )
      return;
    onEdit(taskInfoEdited);
    setIsEditing(false);
  }, [taskInfoEdited]);

  const handleToggleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTaskInfoEdited((pre) => ({ ...pre, [name]: value }));
    },
    [],
  );

  const completeTask = {
    strokeWidth: "3px",
    color: status === "completed" ? "#22c55e" : "#dbd6d6",
  };

  return isEditing ? (
    <PomodoroTaskForm
      onChange={handleOnChange}
      onToggle={handleToggleEditing}
      onSave={handleEdit}
      taskInfo={taskInfoEdited}
    />
  ) : (
    <div className="w-full h-11 hover:cursor-pointer ">
      <div
        onClick={onPriorityTask}
        className="flex items-center bg-zinc-900 rounded-md h-full my-2 group"
      >
        <div
          className={`${statusStyle[status]} group-hover:bg-yellow-400 h-full w-2  rounded-tl-md rounded-bl-md`}
        />
        <Button
          onClick={(e) => onComplete(e)}
          className="bg-transparent hover:opacity-80"
        >
          <CheckCircle {...completeTask} />
        </Button>
        <p
          className={clsx("text-base font-medium ", {
            "line-through": status == "completed",
          })}
        >
          {title}
        </p>
        <div className="flex-1 flex justify-end">
          <span className="text-xs font-black">
            {progress} / {estPomodoro}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto bg-transparent">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleToggleEditing}>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
