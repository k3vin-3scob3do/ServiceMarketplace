"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UserModel } from "../models/user";

interface UserContextType {
  user: UserModel | null;
  setUser: (u: UserModel | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}
