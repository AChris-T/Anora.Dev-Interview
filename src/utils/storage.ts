// utils/storage.ts
import type { Task } from '../types/Task';

const STORAGE_KEY = 'task-dashboard';

export const loadTasksFromStorage = (): Task[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tasks from storage:', error);
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};
