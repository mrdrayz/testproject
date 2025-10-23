import { useState, useEffect } from 'react';
import { Todo } from '../Types/todo';
import { api } from '../Services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await api.getTodos();
        setTodos(response.data.todos);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const addTodo = async (text: string) => {
    try {
      const newTodo = {
        todo: text,
        completed: false,
        userId: 1,
      };
      const response = await api.createTodo(newTodo);
      setTodos([response.data, ...todos]);
    } catch (err: any) {
      setError(err.message || 'Failed to add todo');
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await api.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => (t.id === id ? response.data : t)));
    } catch (err) {
      console.warn('Update failed, but we will update locally');
      setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.warn('Delete failed, but we will remove locally');
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  return { todos: filteredTodos, loading, error, addTodo, toggleTodo, deleteTodo, filter, setFilter };
};