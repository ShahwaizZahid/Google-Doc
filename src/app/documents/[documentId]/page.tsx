import { Document } from "./document";

import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

import { DocumentIdPageProps } from "@/constants/types";
import { redirect } from "next/navigation";
import OwnerValidateProvider from "@/hooks/useOwnerLoader";

const DocumentIdPage = async ({
  params,
  searchParams,
}: DocumentIdPageProps) => {
  const { documentId } = await params;
  const { sharetoken, permission } = searchParams || {}; // Extract query parameters from the URL
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }
  if (!sharetoken || !permission) {
    console.log("No sharetoken or permission provided");
  }

  let preloadedDocument;
  
  try {
    preloadedDocument = await preloadQuery(
      api.documents.getsByIdShareDocument,
      {
        id: documentId,
        sharetoken: sharetoken,
        permission: permission,
      },
      { token }
    );
  } catch (e) {
    console.error("Failed to preload document:", e);
    redirect("/");
  }

  if (!preloadedDocument) {
    return redirect("/");
  }

  return (
    <OwnerValidateProvider>
      <Document preloadedDocument={preloadedDocument} />;
    </OwnerValidateProvider>
  );
};

export default DocumentIdPage;
