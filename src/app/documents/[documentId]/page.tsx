import { Document } from "./document";

import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

import { DocumentIdPageProps } from "@/constants/types";
import { redirect } from "next/navigation";
import OwnerValidateProvider from "@/hooks/useOwnerLoader";

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  let preloadedDocument;

  try {
    preloadedDocument = await preloadQuery(
      api.documents.getById,
      { id: documentId },
      { token }
    );
  } catch (error) {
    console.error("Failed to preload document:", error);
    redirect("/");
  }

  if (!preloadedDocument) {
    console.log("here");
    return redirect("/");
  }

  return (
    <OwnerValidateProvider>
      <Document preloadedDocument={preloadedDocument} />;
    </OwnerValidateProvider>
  );
};

export default DocumentIdPage;
