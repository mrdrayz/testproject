import { useState, useEffect } from 'react';
import { Todo } from '../Types/todo'; 
import { api } from '../Services/api';

const LOCAL_STORAGE_KEY = 'userTodos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const saveLocalTodosToStorage = (allTodos: Todo[]) => {
    const localTodos = allTodos.filter(todo => todo.isLocal === true);
   
    console.log('Saving to localStorage:', localTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localTodos));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);

        const response = await api.getTodos();
        if (response.data && response.data.todos) {
          const apiTodos: Todo[] = response.data.todos.map(todo => ({ ...todo, isLocal: false }));

          const savedLocalTodos: Todo[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
          console.log('Loaded from localStorage:', savedLocalTodos); 

          setTodos([...apiTodos, ...savedLocalTodos]);
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
    const newLocalTodo: Todo = {
      id: Date.now(), 
      todo: text,
      completed: false,
      userId: 1,
      isLocal: true
    };

    const updatedTodos = [newLocalTodo, ...todos];
    setTodos(updatedTodos);

    saveLocalTodosToStorage(updatedTodos);
  };

  const toggleTodo = (id: number) => { 
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodos = todos.map(t => 
      t.id === id 
        ? { ...t, completed: !t.completed } 
        : t
    );

    setTodos(updatedTodos);

    if (todo.isLocal) {
      saveLocalTodosToStorage(updatedTodos);
    }
  };

  const editTodo = (id: number, newText: string) => { 
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodos = todos.map(t => 
      t.id === id 
        ? { ...t, todo: newText } 
        : t
    );

    setTodos(updatedTodos);

    if (todo.isLocal) {
      saveLocalTodosToStorage(updatedTodos);
    }
  };

  const deleteTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);

    if (todo.isLocal) {
      saveLocalTodosToStorage(updatedTodos);
    }
  };

  return { todos: filteredTodos, loading, error, addTodo, toggleTodo, deleteTodo, editTodo, filter, setFilter };
};