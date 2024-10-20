// src/TodoList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "./firebase"; // Import Firestore instance
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth functions
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Import Firestore functions

const Todo = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Check if user is logged in by looking for userId in local storage
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login"); // Redirect to login if userId is not found
    }
  }, [navigate]);

  // Load todos from Firestore on initial render
  useEffect(() => {
    const loadTodos = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return; // Ensure userId is present

      const todosCollection = collection(db, "todos"); // Access the 'todos' collection
      const snapshot = await getDocs(todosCollection);
      const todosList = snapshot.docs
        .filter((doc) => doc.data().userId === userId) // Filter by userId
        .map((doc) => ({ id: doc.id, ...doc.data() })); // Get todos with their IDs

      setTodos(todosList);
    };

    loadTodos();
  }, []);

  // Function to add a new todo item
  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return; // Prevent adding empty items

    const userId = localStorage.getItem("userId");
    const newTodoItem = { text: newTodo, userId }; // Create todo item with userId

    // Add todo to Firestore
    await addDoc(collection(db, "todos"), newTodoItem);
    setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    setNewTodo(""); // Clear the input field
  };

  // Function to remove a todo item
  const removeTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id)); // Delete from Firestore
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove locally
  };

  // Function to handle logout
  const handleLogout = async () => {
    const auth = getAuth(); // Get Firebase Auth instance
    try {
      await signOut(auth); // Sign out from Firebase Auth
      localStorage.removeItem("userId"); // Remove userId from local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out:", error); // Handle any errors
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          onClick={handleLogout}
          className="bg-blue-800 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
      <form onSubmit={addTodo} className="flex items-center mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border rounded p-2 w-64 mr-2"
          placeholder="Add a new todo"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Todo
        </button>
      </form>

      {/* Conditional rendering */}
      {todos.length === 0 ? (
        <div className="text-center text-green-600 text-xl font-semibold">
          Good job on completing all tasks!
        </div>
      ) : (
        <ul className="list-disc p-4 bg-gray-100 rounded-lg shadow-md">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="mb-2 flex justify-between items-center p-2 bg-white rounded-lg shadow hover:bg-gray-50 transition duration-200"
            >
              {todo.text}
              <button
                onClick={() => removeTodo(todo.id)}
                className="ml-2 bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
