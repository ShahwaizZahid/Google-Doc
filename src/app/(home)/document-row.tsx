import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import DocumentMenu from "./document-menu";
import { DocumentRowProps } from "@/constants/types";

import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";

import { TableRow, TableCell } from "@/components/ui/table";

export default function DocumentRow({ document }: DocumentRowProps) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/documents/${document._id}`)}
      className="cursor-pointer"
    >
      <TableCell className="w-[50px] hidden md:block">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        <span className="hidden md:block">
          {document.organizationId ? "Organization" : "Personal"}
        </span>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex ml-auto justify-end ">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
        />
      </TableCell>
    </TableRow>
  );
}
