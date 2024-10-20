import React, { useState } from "react";
import { auth } from "./firebase"; // Ensure the path is correct
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // Import signOut
import { useNavigate } from "react-router-dom";

function Login() {
  const [userEmail, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const taketoSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        Password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      localStorage.setItem("userId", user.uid);
      navigate("/todo");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    navigate("/forgotPassword");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white border border-blue-300 p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-bold mb-4">
          A Simple Todo List app
        </h1>{" "}
        {/* Title added here */}
        <div className="mb-4">
          <label className="block">Enter email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
        <button
          type="button"
          className="bg-white text-blue-500 p-2 rounded w-full mt-2 border border-blue-500"
          onClick={taketoSignUp}
        >
          Sign-up
        </button>
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded w-full mt-2"
          onClick={handleLogout}
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
}

export default Login;
