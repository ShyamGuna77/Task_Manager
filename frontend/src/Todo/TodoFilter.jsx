import React from "react";

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-2">
      <select
        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
    </div>
  );
};

export default TodoFilter;
