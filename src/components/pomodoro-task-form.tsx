import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: () => void;
  taskInfo: {
    title: string;
    estPomodoro: number;
  };

  onSave: () => void;
};

export default function PomodoroTaskForm({
  taskInfo,
  onChange,
  onToggle,
  onSave,
}: Props) {
  return (
    <div className="py-4 px-4 bg-zinc-900 my-2 rounded-md">
      <input
        name="title"
        onChange={onChange}
        value={taskInfo.title}
        placeholder="What are you working on ?"
        className="w-full bg-transparent outline-none font-semibold text-xl italic"
      />
      <span className="text-sm font-bold text-gray-400">Ets Pomodoros</span>
      <div className="flex items-center">
        <input
          step={1}
          type="number"
          onChange={onChange}
          value={taskInfo.estPomodoro}
          name="estPomodoro"
          className="max-w-20 bg-transparent border rounded-md p-1 appearance-none mt-1 border-gray-600"
        />
        <Button className="p-1 mx-2 h-full border border-gray-600 hover:opacity-80">
          <ChevronUp />
        </Button>
        <Button className="p-1 h-full border border-gray-600 hover:opacity-80">
          <ChevronDown />
        </Button>
      </div>
      <div className="flex items-center justify-end mt-1 gap-2">
        <Button
          onClick={onToggle}
          variant="default"
          className="hover:opacity-80"
        >
          Cancel
        </Button>
        <Button onClick={onSave} className="text-gray-950" variant="outline">
          Save
        </Button>
      </div>
    </div>
  );
}
