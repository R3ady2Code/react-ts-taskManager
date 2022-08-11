export interface ISubtask {
  title: string;
  completed: boolean;
  dateBy: number;
  isEdit?: boolean;
}

export interface ITask {
  title: string;
  dateBy: number;
  status: string;
  description?: string;
  subtasks?: ISubtask[];
  deadline?: {
    date?: string;
    time?: string;
  };
}
