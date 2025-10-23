import React from 'react';
import { useTodos } from '../Hooks/useTodos';
import { TodoItem } from '../Components/TodoList/TodoItem';
import { TodoForm } from '../Components/TodoList/TodoForm';

export const TodoPage: React.FC = () => {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo, editTodo, filter, setFilter } = useTodos(); 

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">My Todo List</h1>

      <TodoForm onAdd={addTodo} />

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'font-bold text-blue-500' : 'text-gray-500 hover:text-blue-300'}
        >
          All
        </button>

        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'font-bold text-blue-500' : 'text-gray-500 hover:text-blue-300'}
        >
          Active
        </button>
        
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'font-bold text-blue-500' : 'text-gray-500 hover:text-blue-300'}
        >
          Completed
        </button>
      </div>

      <ul>
        {todos.length > 0 ? (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">No tasks found</li>
        )}
      </ul>
    </div>
  );
};