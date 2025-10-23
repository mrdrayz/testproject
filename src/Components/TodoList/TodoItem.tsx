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
          className="mr-3 h-5 w-5"
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
              className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all transform hover:scale-110"
              title="Save"
            >
              ✓
            </button>

            <button
              onClick={handleCancel}
              className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-400 transition-all transform hover:scale-110"
              title="Cancel"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-all transform hover:scale-110"
              title="Edit"
            >
              ✏️
            </button>

            <button
              onClick={() => onDelete(todo.id)}
              className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-all transform hover:scale-110"
              title="Delete"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </li>
  );
};