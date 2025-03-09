import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      fetchTodos();
    }
  }, [currentUser]);

  const fetchTodos = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError("");
      const response = await axios.get("http://localhost:3000/api/todos");
      setTodos(response.data);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text, priority = "medium") => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://localhost:3000/api/todos", {
        text,
        priority,
      });
      setTodos([...todos, response.data]);
      return true;
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        updates
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      return true;
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      setError("");
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      return true;
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    return updateTodo(id, { completed: !currentStatus });
  };

  const value = {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
