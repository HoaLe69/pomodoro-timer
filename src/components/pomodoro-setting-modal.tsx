import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import GearFillIcon from "./icons/gear-fill";
import ClockIcon from "./icons/clock";
import { useCallback, useContext, useState } from "react";
import { PomodoroTimerContext } from "@/lib/pomodoro-timer-provider";

interface Props {
  open: boolean;
  onOpenChange: (t: boolean) => void;
}
export default function PomodoroTimerSettingModal({
  open,
  onOpenChange,
}: Props) {
  const { timeDurations, onChangeTimeDurations } =
    useContext(PomodoroTimerContext);
  const [newTimeDurations, setNewTimeDurations] = useState(timeDurations);

  const handleSavePomodoroTimer = useCallback(() => {
    onChangeTimeDurations(newTimeDurations);
    onOpenChange(false);
  }, [newTimeDurations]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setNewTimeDurations((pre) => ({ ...pre, [name]: Number(value) }));
    },
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <GearFillIcon />
          Setting
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96 p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="flex justify-center text-gray-500 font-bold uppercase">
            Setting
          </DialogTitle>
        </DialogHeader>
        <div className="border-t px-4 w-96">
          <span className="flex items-center font-bold gap-1 uppercase text-gray-500 py-4">
            <ClockIcon />
            Timer
          </span>
          <span className="text-sm font-semibold text-gray-700">
            Time (minutes)
          </span>
          <form className="py-2 flex gap-2">
            <InputGroup
              onChange={handleInputChange}
              label="Pomodoro"
              name="pomodoro"
              value={newTimeDurations?.pomodoro}
            />
            <InputGroup
              onChange={handleInputChange}
              label="Short Break"
              name="shortBreak"
              value={newTimeDurations?.shortBreak}
            />
            <InputGroup
              onChange={handleInputChange}
              label="Long Break"
              value={newTimeDurations?.longBreak}
              name="longBreak"
            />
          </form>
        </div>
        <DialogFooter className="px-4 pb-2">
          <Button onClick={handleSavePomodoroTimer}>Save</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface InputGroupProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputGroup({ label, value, name, onChange }: InputGroupProps) {
  return (
    <div className="min-w-0">
      <label className="font-semibold text-gray-500">{label}</label>
      <input
        step={1}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        className="outline-none bg-zinc-200 rounded-xl p-2 w-full font-bold text-gray-600"
      />
    </div>
  );
}
