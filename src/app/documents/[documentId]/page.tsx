import { Document } from "./document";

import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

import { DocumentIdPageProps } from "@/constants/types";
import { redirect } from "next/navigation";
import OwnerValidateProvider from "@/hooks/useOwnerLoader";
import PermissionValidateProvider from "@/hooks/useShareDocument";
import { console } from "node:inspector";

const DocumentIdPage = async ({
  params,
  searchParams,
}: DocumentIdPageProps) => {
  const { documentId } = await params;
  const { sharetoken, permission } = (await searchParams) || {};
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;
  const allowedPermissions = ["read", "edit", undefined];

  if (!token) {
    throw new Error("Unauthorized");
  }

  if (!allowedPermissions.includes(permission)) {
    throw new Error("Document not found");
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
    <PermissionValidateProvider>
      <OwnerValidateProvider>
        <Document
          preloadedDocument={preloadedDocument}
          sharetoken={sharetoken}
          permission={permission ? permission : null}
        />
      </OwnerValidateProvider>
    </PermissionValidateProvider>
  );
};

export default DocumentIdPage;
