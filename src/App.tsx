import React, { useEffect, useState } from 'react';
import styles from './styles/App.module.css';
import TaskForm from './components/TaskForm';
import { useTasks } from './hooks/useTasks';
import TaskBoard from './components/TaskBoard';
import type { Task, TaskStatus } from './types/Task';
import Modal from './components/Modal';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'working', label: 'Task' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const App: React.FC = () => {
  const {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    toggleStatus,
    updateTaskStatus,
    reorderTasks,
    setSearchTerm,
    searchTerm,
    setFilteredStatus,
    setDateRange,
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<TaskStatus | 'all' | 'overdue'>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    setFilteredStatus(status);
  }, [status, setFilteredStatus]);

  useEffect(() => {
    if (from && to) {
      setDateRange({ from, to });
    } else {
      setDateRange(null);
    }
  }, [from, to, setDateRange]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Tasks Management</h1>
          <p>Manage your team members and their account permissions here.</p>
        </div>
         <div className={styles.marginLeftAuto}>
          <ThemeToggle />
        </div>
      </header>
      <div className={styles.tabs}>
          <button className={styles.addButton} onClick={() => setShowForm(true)}>+ Add Task</button>
        <div className={styles.topBar}>
          <div className={styles.filterGrid}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} className={styles.filterField} />
            <select value={status} onChange={e => setStatus(e.target.value as TaskStatus | 'all' | 'overdue')} className={`${styles.select} ${styles.filterField}`}>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className={styles.dateRangeWrapper}>
              <div className={styles.dateRangeFlex}>
                <input placeholder='' type="date" value={from} onChange={e => setFrom(e.target.value)} className={`${styles.dateInput} ${styles.filterField}`} />
                <span className={styles.dateRangeTo}>to</span>
                <input type="date" value={to} onChange={e => setTo(e.target.value)} className={`${styles.dateInput} ${styles.filterField}`} />
              </div>
            </div>
          </div>
        
        </div>
       
      </div>

      <Modal isOpen={showForm} onClose={() => {
        setShowForm(false);
        setEditingTask(null);
      }}>
        <TaskForm
          onSave={(data) => {
            addTask(data);
            setShowForm(false);
          }}
          onUpdate={(id, updates) => {
            updateTask(id, updates);
            setShowForm(false);
          }}
          editingTask={editingTask}
          clearEditing={() => {
            setEditingTask(null);
            setShowForm(false);
          }}
        />
      </Modal>

      <TaskBoard
        tasks={tasks}
        onToggle={toggleStatus}
        onDelete={deleteTask}
        onEdit={(task) => {
          setEditingTask(task);
          setShowForm(true);
        }}
        onStatusChange={updateTaskStatus}
        onReorder={reorderTasks}
      />
    </div>
  );
};

export default App;
