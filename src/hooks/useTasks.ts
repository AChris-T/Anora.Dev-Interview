import { useEffect, useState } from 'react';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskStatus } from '../types/Task';

export const useTasks = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState<TaskStatus | 'all' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);

  useEffect(() => {
    const stored = loadTasksFromStorage();
    if (stored.length === 0) {
      // Only load dummy tasks if localStorage is empty
      fetch('/data/task.json')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: Task[]) => {
          setUserTasks(data);
          setIsFirstLoad(false);
        })
        .catch((err) => {
          console.warn('[DummyLoad] Could not load dummy tasks:', err.message);
          setIsFirstLoad(false);
        });
    } else {
      setUserTasks(stored);
      setIsFirstLoad(false);
    }
  }, []);

  useEffect(() => {
    // Don't save to storage until after initial dummy load
    if (!isFirstLoad) {
      saveTasksToStorage(userTasks);
    }
  }, [userTasks, isFirstLoad]);

  // Add a new user task
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setUserTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setUserTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  };

  const reorderTasks = (newList: Task[]) => {
    setUserTasks(newList);
  };

  const deleteTask = (id: string) => {
    setUserTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleStatus = (id: string) => {
    const task = userTasks.find((t) => t.id === id);
    if (!task) return;

    const nextStatus: TaskStatus =
      task.status === 'working'
        ? 'inProgress'
        : task.status === 'inProgress'
        ? 'completed'
        : 'working';

    updateTask(id, { status: nextStatus });
  };

  const filteredTasks = userTasks.filter((task) => {
    const matchesStatus =
      filteredStatus === 'all'
        ? true
        : filteredStatus === 'overdue'
        ? new Date(task.dueDate) < new Date() && task.status !== 'completed'
        : task.status === filteredStatus;

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesDate = dateRange
      ? new Date(task.dueDate) >= new Date(dateRange.from) && new Date(task.dueDate) <= new Date(dateRange.to)
      : true;

    return matchesStatus && matchesSearch && matchesDate;
  });

  return {
    tasks: filteredTasks, // for UI
    originalTasks: userTasks,
    addTask,
    updateTask,
    updateTaskStatus,
    reorderTasks,
    deleteTask,
    toggleStatus,
    setFilteredStatus,
    setSearchTerm,
    searchTerm,
    dateRange,
    setDateRange,
  };
};
