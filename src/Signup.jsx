import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // import the firebase.js file
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function Signup() {
  const [userEmail, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  const taketoLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Password !== Confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        Password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      navigate("/login");
      // You can add additional logic here, such as redirecting the user or showing a success message
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      // Handle errors here (e.g., showing an error message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blue-300 p-6 rounded shadow-md w-96" // Added border class
      >
        <div className="text-center">Sign-up</div>
        <div className="mb-4">
          <label className="block">Enter email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@example.com"
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
        <div className="mb-4">
          <label className="block">Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit
        </button>
        <button
          className="bg-white text-blue-500 p-2 rounded w-full mt-2 border border-blue-500"
          onClick={taketoLogin}
        >
          Back to login
        </button>
      </form>
    </div>
  );
}

export default Signup;
