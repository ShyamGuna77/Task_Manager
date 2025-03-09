import React, { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import Navbar from "../components/Navbar";
import TodoFilter from "../Todo/TodoFilter";
import TodoForm from "../Todo/TodoForm";
import TodoList from "../Todo/TodoList"

const Dashboard = () => {
  const { todos, loading, error, fetchTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "high":
        return todos.filter((todo) => todo.priority === "high");
      case "medium":
        return todos.filter((todo) => todo.priority === "medium");
      case "low":
        return todos.filter((todo) => todo.priority === "low");
      default:
        return todos;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <TodoForm />

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Your tasks
                </h2>
                <TodoFilter filter={filter} setFilter={setFilter} />
              </div>

              <TodoList
                todos={filteredTodos()}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
