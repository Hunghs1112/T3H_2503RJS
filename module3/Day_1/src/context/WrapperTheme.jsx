import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (
      !localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeStyles = {
    light: {
      backgroundColor: "#ffffff",
      color: "#000000",
      primary: "#f97316", // Vibrant orange for buttons
      primaryDark: "#ea580c", // Darker orange for hover or darker elements
      secondary: "#6c757d",
      border: "#d1d5db",
      inputBg: "#ffffff",
      inputText: "#ffffff", // White text for elements on primary background
    },
    dark: {
      backgroundColor: "#1a1a1a",
      color: "#ffffff",
      primary: "#fb923c", // Lighter orange for buttons in dark theme
      primaryDark: "#f97316", // Vibrant orange for hover or darker elements
      secondary: "#9ca3af",
      border: "#4b5563",
      inputBg: "#374151",
      inputText: "#ffffff", // White text for elements on primary background
    },
  };

  const currentStyles = themeStyles[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: currentStyles }}>
      <div
        style={{
          backgroundColor: currentStyles.backgroundColor,
          color: currentStyles.color,
          minHeight: "100vh",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};