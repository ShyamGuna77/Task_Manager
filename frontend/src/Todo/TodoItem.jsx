import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const { updateTodo, deleteTodo, toggleComplete } = useContext(TodoContext);

  const handleUpdate = async () => {
    if (!editText.trim()) return;

    const success = await updateTodo(todo._id, {
      text: editText,
      priority: editPriority,
    });

    if (success) {
      setIsEditing(false);
    }
  };

  const priorityColor = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <li className="py-4">
      {isEditing ? (
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
              className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                priorityColor[todo.priority]
              }`}
            >
              {todo.priority}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
