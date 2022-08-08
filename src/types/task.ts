export interface ISubtask {
  title: string;
}

export interface ITask {
  title: string;
  dateBy: number;
  completed: Boolean;
  description?: string;
  subtasks?: ISubtask[];
  deadline?: number;
}
