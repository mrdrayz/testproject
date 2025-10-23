import React, { useState } from 'react';
import * as Icon from 'react-icons/fi';
import { Todo } from '../../Types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim().length > 0) {
      onEdit(todo.id, editText.trim());
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.todo);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-3 h-5 w-5 transform hover:scale-105 transition-transform"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''} whitespace-pre-wrap break-words`}>
            {todo.todo}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1 text-green-500 hover:text-gray-700 transition-colors transform hover:scale-105 transition-transform"
              title="Save"
            >
              ✓
            </button>

            <button
              onClick={handleCancel}
              className="p-1 text-red-500 hover:text-gray-700 transition-colors transform hover:scale-105 transition-transform"
              title="Cancel"
            >
              ✕
            </button>
        </>
      ) : (
        <>
          <button
            onClick={handleEdit}
            className="p-1 text-blue-600 hover:text-gray-700 transition-colors transform hover:scale-105 transition-transform"
            title="Edit"
          >
            <Icon.FiEdit className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-red-500 hover:text-gray-700 transition-colors transform hover:scale-105 transition-transform"
            title="Delete"
          >
            <Icon.FiTrash2 className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
    </li>
  );
};