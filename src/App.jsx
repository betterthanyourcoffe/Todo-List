// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase"; // Ensure the path is correct
import { onAuthStateChanged } from "firebase/auth"; // Import this function
import Signup from "./Signup"; // Adjust the import path
import Login from "./Login"; // Adjust the import path
import ForgotPassword from "./ForgotPassword";
import Todo from "./Todo";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Set up a listener for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("Current logged-in user:", user);
      } else {
        setCurrentUser(null);
        console.log("No user is currently logged in.");
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
