import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, loading, error }) => {
  if (loading) {
    return <p className="text-center py-4">Loading todos...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  if (todos.length === 0) {
    return <p className="text-center py-4 text-gray-500">No todos found</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
