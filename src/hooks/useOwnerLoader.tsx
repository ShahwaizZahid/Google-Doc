"use client";
import { OwnerValidateContextType } from "@/constants/types";
import { createContext, useContext, useState } from "react";

const OwnerValidateContext = createContext<OwnerValidateContextType | null>(
  null
);

export function useShowLoaderOwnerValidate() {
  const context = useContext(OwnerValidateContext);
  if (!context) {
    throw new Error(
      "useShowLoaderOwnerValidate must be used inside OwnerValidateProvider"
    );
  }
  return useContext(OwnerValidateContext);
}

export default function OwnerValidateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(false);

  const value = {
    showLoader,
    setShowLoader,
  };

  return (
    <OwnerValidateContext.Provider value={value}>
      {children}
    </OwnerValidateContext.Provider>
  );
}
