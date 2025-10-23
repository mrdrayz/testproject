import React, { useState } from 'react';

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

  const remainingChars = 40 - value.length;

  return (
    <form onSubmit={submitHandler} className="flex mb-6">
      <div className="relative flex-grow">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a new task..."
          className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={40}
        />

        <span className={`absolute right-3 top-3 text-xs ${remainingChars <= 10 ? 'text-red-500' : 'text-gray-500'}`}>
          {remainingChars}
        </span>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 flex items-center"
      >
        Add
      </button>
    </form>
  );
};