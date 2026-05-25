import { useCallback, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    setToast({
      isVisible: true,
      message,
      type,
    });

    const timer = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
