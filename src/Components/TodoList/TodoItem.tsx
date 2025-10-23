import React from 'react';
import * as Icon from 'react-icons/fi';
import { Todo } from '../../Types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-3 h-5 w-5"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.todo}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          {React.createElement(Icon.FiTrash2)}
        </button>
      </div>
    </li>
  );
};