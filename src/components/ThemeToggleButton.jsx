"use client";

import { toggleTheme } from "@/lib/actions/themeSlice";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:scale-110 transition-transform cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};

export default ThemeToggleButton;
