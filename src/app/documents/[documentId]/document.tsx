"use client";

import Editor from "./editor";
import Navbar from "./navbar";
import { Room } from "./room";
import Toolbar from "./toolbar";

import { api } from "../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

type DocumentProps = {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export function Document({ preloadedDocument }: DocumentProps) {
  const document = usePreloadedQuery(preloadedDocument);

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
