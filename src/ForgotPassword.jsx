// ForgotPassword.js
import React, { useState } from "react";
import { auth } from "./firebase"; // Ensure the path is correct
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox."); // Inform the user
      setEmail(""); // Clear the input field
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      alert(error.message); // Show error message
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white border border-blue-300 p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-bold">Forgot Password</h2>
        <div className="mb-4">
          <label className="block">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Send Reset Link
        </button>
        <button
          type="button"
          className="mt-2 bg-white text-blue-500 p-2 rounded w-full border border-blue-500"
          onClick={() => navigate("/login")} // Navigate back to the login screen
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
