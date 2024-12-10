import toast from "react-hot-toast";

const useToast = () => {
  // Utility to determine if dark mode is active
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  // Success notification
  const showSuccessToast = (message) => {
    toast.success(message, {
      style: {
        top: "80px",
        fontFamily: "Inter, sans-serif",
        borderRadius: "8px",
        padding: "16px",
        background: isDarkMode() ? "#2D3748" : "#FFFFFF",
        color: isDarkMode() ? "#E2E8F0" : "#1F2937",
        border: `1px solid ${isDarkMode() ? "#4A5568" : "#CBD5E0"}`,
      },
      iconTheme: {
        primary: "#10B981",
        secondary: isDarkMode() ? "#2D3748" : "#FFFFFF",
      },
    });
  };

  // Error notification
  const showErrorToast = (message) => {
    toast.error(message, {
      style: {
        top: "80px",
        fontFamily: "Inter, sans-serif",
        borderRadius: "8px",
        padding: "16px",
        background: isDarkMode() ? "#2D3748" : "#FFFFFF",
        color: isDarkMode() ? "#E2E8F0" : "#1F2937",
        border: `1px solid ${isDarkMode() ? "#4A5568" : "#CBD5E0"}`,
      },
      iconTheme: {
        primary: "#EF4444",
        secondary: isDarkMode() ? "#2D3748" : "#FFFFFF",
      },
    });
  };

  // Info notification
  const showInfoToast = (message) => {
    toast(message, {
      style: {
        top: "80px",
        fontFamily: "Inter, sans-serif",
        borderRadius: "8px",
        padding: "16px",
        background: isDarkMode() ? "#2D3748" : "#FFFFFF", // dark or light card
        color: isDarkMode() ? "#CBD5E0" : "#4B5563", // dark or light gray text
        border: `1px solid ${isDarkMode() ? "#718096" : "#CBD5E0"}`, // consistent info border
      },
      iconTheme: {
        primary: "#3B82F6", // consistent info blue
        secondary: isDarkMode() ? "#2D3748" : "#FFFFFF", // adjust for dark background
      },
    });
  };

  const showPromiseToast = async (promise, messages) => {
    toast.promise(
      promise,
      {
        loading: messages.loading || "Loading...",
        success: messages.success || "Success!",
        error: messages.error || "Something went wrong!",
      },
      {
        style: {
          top: "80px",
          fontFamily: "Inter, sans-serif",
          borderRadius: "8px",
          padding: "16px",
          background: isDarkMode() ? "#2D3748" : "#FFFFFF",
          color: isDarkMode() ? "#E2E8F0" : "#1F2937",
          border: `1px solid ${isDarkMode() ? "#4A5568" : "#CBD5E0"}`,
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: isDarkMode() ? "#2D3748" : "#FFFFFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: isDarkMode() ? "#2D3748" : "#FFFFFF",
          },
        },
      }
    );
  };

  return { showSuccessToast, showErrorToast, showInfoToast, showPromiseToast };
};

export default useToast;
