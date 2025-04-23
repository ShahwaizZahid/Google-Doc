"use client";

import { usePermissionValidate } from "@/hooks/useShareDocument";
import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";

import { DocumentProps } from "@/constants/types";

import { usePreloadedQuery } from "convex/react";
import { useEffect } from "react";

export function Document({
  preloadedDocument,
  sharetoken,
  permission,
}: DocumentProps) {
  const { setShareDocument, setPermission } = usePermissionValidate()!;
  const document = usePreloadedQuery(preloadedDocument);


  useEffect(() => {
    if (!sharetoken && !permission) {
      if (permission === undefined) {
        setPermission(null);
      }
      setShareDocument(false);
    } else if (sharetoken && permission) {
      setPermission(permission);
      setShareDocument(true);
    }
  }, [sharetoken, permission, setPermission, setShareDocument]);

  if (!document) return null;

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 right-0 left-0 z-10 bg-[#FAFBFC] print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
}
