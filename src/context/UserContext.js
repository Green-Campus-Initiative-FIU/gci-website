"use client";

import { createContext, useContext, useMemo } from "react";

const UserContext = createContext(null);

// ** Provider for the UserContext with memoization to reduce unnecessary re-renders **
export function UserProvider({ children, user }) {
  const memoizedUser = useMemo(() => user, [user]);
  return (
    <UserContext.Provider value={memoizedUser}>{children}</UserContext.Provider>
  );
}

// ** Custom hook to easily access user data rather than useContext directly **
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
