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
import { ITaskEditedInfo } from "@/lib/types";

interface TaskItemProps {
  id: string;
  title: string;
  status: string;
  estPomodoro: number;
  onEdit: (taskInfoEdited: ITaskEditedInfo) => void;
  onDelete: () => void;
}

export default function PomodoroTaskItem({
  id,
  title,
  status,
  onEdit,
  onDelete,
  estPomodoro,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskInfoEdited, setTaskInfoEdited] = useState({
    id,
    title,
    estPomodoro,
  });
  const statusStyle: Record<string, string> = {
    todo: "bg-gray-300",
    inprogress: "bg-yellow-400",
    completed: "bg-green-500",
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

  return isEditing ? (
    <PomodoroTaskForm
      onChange={handleOnChange}
      onToggle={handleToggleEditing}
      onSave={handleEdit}
      taskInfo={taskInfoEdited}
    />
  ) : (
    <div className="w-full h-11">
      <div className="flex items-center bg-zinc-900 rounded-md h-full my-2">
        <div
          className={`${statusStyle[status]} h-full w-2  rounded-tl-md rounded-bl-md`}
        />
        <Button className="bg-transparent hover:opacity-80">
          <CheckCircle />
        </Button>
        <p
          className={clsx("text-base font-medium ", {
            "line-through": status == "completed",
          })}
        >
          {title}
        </p>
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
