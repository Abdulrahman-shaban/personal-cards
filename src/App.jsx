import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
import EditCard from "./pages/EditCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
        {/* Navigation Bar */}
 <nav className="bg-white dark:bg-gray-800 shadow">
  <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
    {/* Left: Home */}
    <div className="w-1/3">
      <Link to="/" className="hover:underline">
        Home
      </Link>
    </div>

    {/* Center: Add Card */}
    <div className="w-1/3 text-center">
      <Link to="/add" className="hover:underline">
        Add Card
      </Link>
    </div>

    {/* Right: Dark Mode */}
    <div className="w-1/3 text-right">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  </div>
</nav>


        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCard />} />
        <Route path="/edit/:index" element={<EditCard />} /> {/* ✅ This line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
