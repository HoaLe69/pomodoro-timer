export type ITaskEditedInfo = {
  id: string;
  title: string;
  estPomodoro: number;
};

export type ITask = {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "completed";
  estPomodoro: 1;
  progress: 0;
};
