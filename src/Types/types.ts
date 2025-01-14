export interface TaskType {
  id: number,
  title: string,
  description: string,
}


export interface ColumnType {
    id: string;
    title: string;
    tasks: TaskType[];
  }