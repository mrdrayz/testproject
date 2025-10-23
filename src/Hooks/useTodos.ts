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

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), 
      todo: text,
      completed: false,
      userId: 1,
      isLocal: true, 
    };

    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          if (todo.isLocal) {
            return { ...todo, completed: !todo.completed };
          }

          return { ...todo, completed: !todo.completed };
        }

        return todo;
      })
    );
  };

  const editTodo = (id: number, newText: string) => {
    if (newText.trim().length === 0) return; 

    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, todo: newText.trim() };
        }
        
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return { todos: filteredTodos, loading, error, addTodo, toggleTodo, deleteTodo, editTodo, filter, setFilter };
};