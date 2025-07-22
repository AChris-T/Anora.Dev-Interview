import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from '../styles/TaskForm.module.css';
import type { Task, TaskStatus } from '../types/Task';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().default('').optional(),
  dueDate: yup
  .string()
  .required('Due date is required')
  .test(
    'is-today-or-future',
    'Due date cannot be in the past',
    (value) => {
      if (!value) return false;
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }
  ),
  priority: yup
    .string()
    .oneOf(['low', 'medium', 'high'])
    .required('Priority is required'),
  status: yup
    .string()
    .oneOf(['working', 'inProgress', 'completed', 'pending'])
    .required('Status is required'),
});


type FormValues = yup.InferType<typeof schema>;

type Props = {
  onSave: (data: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  editingTask: Task | null;
  clearEditing: () => void;
};

const TaskForm: React.FC<Props> = ({ onSave, onUpdate, editingTask, clearEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      priority: 'medium',
      status: 'working',
    },
  });

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description ?? '',
        dueDate: editingTask.dueDate,
        priority: editingTask.priority,
        status: editingTask.status,
      });
    } else {
      reset();
    }
  }, [editingTask, reset]);

  const onSubmit = (data: FormValues) => {
    if (editingTask) {
      onUpdate(editingTask.id, { ...data, status: data.status as TaskStatus });
      clearEditing();
    } else {
      onSave({ ...data, status: data.status as TaskStatus }); 
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>

      <label htmlFor="title">Title</label>
      <input id="title" placeholder="Enter task title" {...register('title')} />
      {errors.title && <span className={styles.error}>{errors.title.message}</span>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Enter task description"
        rows={4}
        {...register('description')}
      />

      <label htmlFor="dueDate">Due Date</label>
      <input  type="date" id="dueDate" {...register('dueDate')} />
      {errors.dueDate && <span className={styles.error}>{errors.dueDate.message}</span>}

      <label htmlFor="priority">Priority</label>
      <select  id="priority" {...register('priority')}>
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {errors.priority && <span className={styles.error}>{errors.priority.message}</span>}

      <label htmlFor="status">Status</label>
      <select   id="status" {...register('status')}>
        <option value="">Select status</option>
        <option value="working">Working</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      {errors.status && <span className={styles.error}>{errors.status.message}</span>}

      <div className={styles.actions}>
        <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
        {editingTask && (
          <button type="button" onClick={clearEditing} className={styles.cancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
