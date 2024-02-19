import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  authenticated: boolean;
  id: string;
  username: string;
  profileImage: string;
  email: string;
  darkmode: boolean;
  locale: string;
}

interface AuthState {
  user: User | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
}

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
