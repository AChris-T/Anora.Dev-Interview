import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

describe('TaskItem', () => {
  const task: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test description',
    status: 'working',
    dueDate: '2025-07-28',
    createdAt: '2025-07-18T10:00:00Z',
    priority: 'medium',
  };
  it('renders task title', () => {
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} onEdit={onEdit} />);
    fireEvent.click(screen.getByLabelText(/edit task/i));
    expect(onEdit).toHaveBeenCalled();
  });
  it('calls onDelete when delete button is clicked and confirmed', () => {
    const onDelete = jest.fn();
    window.confirm = jest.fn(() => true);
    render(<TaskItem task={task} onToggle={() => {}} onDelete={onDelete} onEdit={() => {}} />);
    fireEvent.click(screen.getByLabelText(/delete task/i));
    expect(onDelete).toHaveBeenCalled();
  });
  it('calls onToggle when checkbox is clicked', () => {
    const onToggle = jest.fn();
    render(<TaskItem task={task} onToggle={onToggle} onDelete={() => {}} onEdit={() => {}} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalled();
  });
}); 