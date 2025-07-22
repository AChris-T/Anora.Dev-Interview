import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('can add, update, and delete a task', async () => {
    const { result } = renderHook(() => useTasks());
    // Wait for the effect to finish (simulate fetch)
    await waitFor(() => expect(result.current.tasks.length).toBe(0));
    await act(async () => {
      result.current.addTask({
        title: 'Test',
        description: 'Desc',
        dueDate: '2025-07-28',
        priority: 'medium',
        status: 'working',
      });
    });
    await waitFor(() => expect(result.current.tasks.length).toBe(1));
    const id = result.current.tasks[0].id;
    await act(async () => {
      result.current.updateTask(id, { title: 'Updated' });
    });
    expect(result.current.tasks[0].title).toBe('Updated');
    await act(async () => {
      result.current.deleteTask(id);
    });
    expect(result.current.tasks.length).toBe(0);
  });
}); 