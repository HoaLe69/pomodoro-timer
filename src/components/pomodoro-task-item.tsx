"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CheckCircle, EllipsisVertical, Trash, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";

interface TaskItemProps {
  id: string;
  title: string;
  status: string;
}

export default function PomodoroTaskItem({
  id = "task-1",
  title = "Complete project documentation",
  status,
}: TaskItemProps) {
  const statusStyle: Record<string, string> = {
    todo: "bg-gray-300",
    inprogress: "bg-yellow-400",
    completed: "bg-green-500",
  };

  const handleEdit = useCallback(() => {
    //
  }, []);

  const handleDelete = useCallback(() => {
    //
  }, []);

  return (
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
            <DropdownMenuItem>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
