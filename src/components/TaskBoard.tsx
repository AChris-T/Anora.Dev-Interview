import React from 'react';
import TaskItem from './TaskItem';
import styles from '../styles/TaskBoard.module.css';
import type { Task } from '../types/Task';

import { DndContext, closestCorners } from '@dnd-kit/core'; 
import type { DragEndEvent } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  onReorder: (newTaskList: Task[]) => void;
};

const TaskBoard: React.FC<Props> = ({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onStatusChange,
  onReorder,
}) => {
  const columns: Record<Task['status'], { title: string; icon: string }> = {
    working: { title: 'Tasks', icon: '📌' },
    inProgress: { title: 'In Progress', icon: '🕐' },
    completed: { title: 'Completed', icon: '✅' },
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const draggedTask = tasks.find((t) => t.id === active.id);
    const targetTask = tasks.find((t) => t.id === over.id);

    if (!draggedTask || !targetTask) return;

    const sameColumn = draggedTask.status === targetTask.status;

    if (sameColumn) {
      const columnTasks = tasks.filter((t) => t.status === draggedTask.status);
      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      const merged = [
        ...tasks.filter((t) => t.status !== draggedTask.status),
        ...reordered,
      ];
      onReorder(merged);
    } else {
      onStatusChange(draggedTask.id, targetTask.status);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.board}>
        {Object.entries(columns).map(([status, { title, icon }]) => {
          const columnTasks = tasks
            .filter((task) => task.status === status)
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

          return (
            <div key={status} className={styles.column}>
              <div className={styles.columnHeader}>
                <span>{icon}</span>
                <h3>{title}</h3>
              </div>

              <SortableContext
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className={styles.taskList}>
                  {columnTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
