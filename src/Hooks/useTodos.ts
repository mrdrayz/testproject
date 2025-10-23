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

        if (response.data && response.data.todos) {
          const initialTodos = response.data.todos.map(todo => ({ ...todo, isLocal: false }));

          setTodos(initialTodos);
        } else {
          throw new Error('Invalid API response format');
        }
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
      const newTodo: Todo = {
        id: Date.now(), 
        todo: text,
        completed: false,
        userId: 1,
        isLocal: true, 
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

    if (todo.isLocal) {
      setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
      return;
    }

    try {
      await api.updateTodo(id, { completed: !todo.completed });

      setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    } catch (err: any) {
      console.warn('Toggle failed, updating locally');

      setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }
  };

  const editTodo = async (id: number, newText: string) => {
    const todo = todos.find(t => t.id === id);
    
    if (!todo) return;

    if (todo.isLocal) {
      setTodos(todos.map(t => (t.id === id ? { ...t, todo: newText } : t)));

      return;
    }

    try {
      await api.updateTodo(id, { todo: newText });

      setTodos(todos.map(t => (t.id === id ? { ...t, todo: newText } : t)));
    } catch (err: any) {
      console.warn('Edit failed, updating locally');

      setTodos(todos.map(t => (t.id === id ? { ...t, todo: newText } : t)));
    }
  };

  const deleteTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) return;

    if (todo.isLocal) {
      setTodos(todos.filter(t => t.id !== id));

      return;
    }

    try {
      await api.deleteTodo(id);

      setTodos(todos.filter(t => t.id !== id));
    } catch (err: any) {
      console.warn('Delete failed, removing locally');

      setTodos(todos.filter(t => t.id !== id));
    }
  };

  return { todos: filteredTodos, loading, error, addTodo, toggleTodo, deleteTodo, editTodo, filter, setFilter };
};