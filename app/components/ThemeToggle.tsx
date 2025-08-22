"use client";

import { useTheme } from "./ThemeProvider";
import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      ariaLabel={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="p-2"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </Button>
  );
}

