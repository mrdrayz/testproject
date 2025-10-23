import React, { useState } from 'react';
import * as Icon from 'react-icons/fi';

interface Props {
  onAdd: (text: string) => void;
}

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form onSubmit={submitHandler} className="flex mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 flex items-center"
      >
        {React.createElement(Icon.FiPlus, { className: "mr-1" })} Add
      </button>
    </form>
  );
};