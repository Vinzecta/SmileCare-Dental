import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(undefined);
const STORAGE_KEY = "smilecare-auth-user";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn("Failed to parse stored auth user", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async ({ email, password }) => {
    // Simple mock authentication to validate frontend flow without backend support.
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Simulate network delay for better UX feedback.
    await new Promise((resolve) => setTimeout(resolve, 400));

    const baseName = email.split("@")[0] || "guest";
    const formattedName = baseName.replace(/[^a-zA-Z0-9]/g, " ").replace(/\s+/g, " ").trim();
    const displayName = formattedName
      ? formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
      : "Guest";

    const mockUser = {
      id: `mock-${Date.now()}`,
      name: displayName,
      email,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
    };

    setUser(mockUser);
    return mockUser;
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
