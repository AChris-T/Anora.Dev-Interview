import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '../types/Task';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
