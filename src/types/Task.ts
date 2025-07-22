// src/types/Task.ts

export type TaskStatus = 'working' | 'inProgress' | 'completed' ;
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  priority: TaskPriority;
}
