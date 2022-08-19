export interface ISubtask {
  title: string;
  completed: boolean;
  dateBy: number;
  taskId: number;
}

export interface ITask {
  title: string;
  dateBy: number;
  status: string;
  boxId?: number;
  description?: string;
  deadline?: {
    date?: string;
    time?: string;
  };
}

export interface IBox {
  title: string;
  id: number;
}
