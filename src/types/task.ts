export interface ISubtask {
  title: string;
  completed: boolean;
  dateBy: number;
}

export interface ITask {
  title: string;
  dateBy: number;
  completed: Boolean;
  description?: string;
  subtasks?: ISubtask[];
  deadline?: number;
}
