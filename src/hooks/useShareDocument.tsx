"use client";
import { createContext, useContext, useState } from "react";

export type PermissionValidateContextType = {
  permission: "read" | "edit" | null;
  setPermission: (value: "read" | "edit" | null) => void;
  shareDocument: boolean;
  setShareDocument: (value: boolean) => void;
};

const PermissionValidateContext =
  createContext<PermissionValidateContextType | null>(null);

export function usePermissionValidate() {
  const context = useContext(PermissionValidateContext);
  if (!context) {
    throw new Error(
      "usePermissionValidate must be used inside PermissionValidateProvider"
    );
  }
  return useContext(PermissionValidateContext);
}

export default function PermissionValidateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permission, setPermission] = useState<"read" | "edit" | null>(null);
  const [shareDocument, setShareDocument] = useState(false);

  const value = {
    permission,
    setPermission,
    shareDocument,
    setShareDocument,
  };

  return (
    <PermissionValidateContext.Provider value={value}>
      {children}
    </PermissionValidateContext.Provider>
  );
}
