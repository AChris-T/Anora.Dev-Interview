import React from 'react';
import styles from '../styles/TaskItem.module.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/Task';
import { IconDelete, IconEdit } from '../assets/icon';

function useIsDarkMode() {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.getAttribute('data-theme') === 'dark'
  );
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  const isCompleted = task.status === 'completed';
  const priorityClass = styles[task.priority];
  const isDark = useIsDarkMode();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete "${task.title}"?`);
    if (confirmed) {
      onDelete(task.id);
    }
  };

  const iconColor = isDark ? '#fff' : '#000';

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={`${styles.card} ${styles.fadeIn}`}>
      <div {...listeners} className={styles.dragHandle} title="Drag to reorder">⠿</div>
      <div className={styles.header}>
        <h4 className={`${styles.title} ${isCompleted ? styles.completed : ''}`}>
          {task.title}
        </h4>
        <div className={styles.meta}>
          <span>🕒 {task.dueDate}</span>
        </div>
      </div>

      <p className={styles.description}>{task.description}</p>

      <div className={styles.badges}>
        <span className={`${styles.badge} ${priorityClass}`}>
          {task.priority.toUpperCase()}
        </span>
        <span className={styles.badge}>{task.status.toUpperCase()}</span>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionButtons}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className={styles.iconButton}
            aria-label="Edit task"
            title="Edit"
          >
            <IconEdit color={iconColor} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className={styles.iconButton}
            aria-label="Delete task"
            title="Delete"
          >
            <IconDelete color={iconColor}/>
          </button>
        </div>

        <label className={styles.toggle}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(task.id)}
          />
          {isCompleted ? 'Done' : 'Mark as Done'}
        </label>
      </div>
    </div>
  );
};

export default TaskItem;
