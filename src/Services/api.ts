import axios from 'axios';
import { Todo } from '../Types/todo';

const API_BASE = 'https://dummyjson.com/todos';

export const api = {
  getTodos: () => axios.get<{ todos: Todo[] }>(`${API_BASE}`),
  getTodoById: (id: number) => axios.get<Todo>(`${API_BASE}/${id}`),
  createTodo: (data: Omit<Todo, 'id'>) => axios.post<Todo>(`${API_BASE}/add`, data),
  updateTodo: (id: number, data: Partial<Todo>) => axios.put<Todo>(`${API_BASE}/${id}`, data),
  deleteTodo: (id: number) => axios.delete<Todo>(`${API_BASE}/${id}`),
};