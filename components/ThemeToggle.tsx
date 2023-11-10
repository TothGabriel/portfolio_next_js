"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Make sure to install react-icons if you haven't

export default function ThemeToggle() {
  // Initialize theme state to 'dark' or the stored theme in localStorage
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "dark"; // Default to 'dark' if no theme is stored
  });

  // Apply the theme class to the root element and store the theme in localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both classes before adding the desired one to prevent conflicts
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Store the selected theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle the theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="transition duration-500 ease-in-out transform hover:rotate-180"
    >
      {theme === "light" ? (
        <FaMoon className="text-yellow-500" />
      ) : (
        <FaSun className="text-yellow-500" />
      )}
    </button>
  );
}
