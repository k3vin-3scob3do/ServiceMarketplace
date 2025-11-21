"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setIsReady(true);
  }, []);

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, isReady }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
