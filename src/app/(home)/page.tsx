"use client";

import React from "react";
import Navbar from "./navbar";
import TemplatesGallery from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DocumentsTables from "./documents-table";

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTables
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
