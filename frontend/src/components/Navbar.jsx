import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">Task Manager</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {currentUser?.name}</span>
            <button
              onClick={logout}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
