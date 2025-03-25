import { useEffect } from "react";

const useSecurityMeasures = () => {
  useEffect(() => {
    // Prevent right-click
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent keyboard shortcuts (e.g., Ctrl+S, Ctrl+P, Ctrl+I, F12, etc.)
    const preventKeyboardShortcuts = (e) => {
      // Block specific key combinations
      if (
        (e.ctrlKey && e.key === "s") || // Ctrl+S
        (e.ctrlKey && e.key === "p") || // Ctrl+P
        (e.ctrlKey && e.key === "u") || // Ctrl+U (View Source)
        (e.ctrlKey && e.shiftKey && e.key === "i") || // Ctrl+Shift+I (DevTools)
        (e.ctrlKey && e.shiftKey && e.key === "j") || // Ctrl+Shift+J (DevTools)
        e.key === "F12" // F12 (DevTools)
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventKeyboardShortcuts);

    // Clean up event listeners when component is unmounted
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventKeyboardShortcuts);
    };
  }, []);
};

export default useSecurityMeasures;
