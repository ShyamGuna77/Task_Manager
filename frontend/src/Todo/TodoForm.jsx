import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const { addTodo, loading } = useContext(TodoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const success = await addTodo(text, priority);
    if (success) {
      setText("");
      setPriority("medium");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading || !text.trim()}
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
