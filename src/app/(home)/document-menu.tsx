import React from "react";

import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";

import { DocumentMenuProps } from "@/constants/types";

import { Button } from "@/components/ui/button";
import RemoveDialog from "@/components/remove-dialog";
import RenameDialog from "@/components/rename-dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DocumentMenu({
  documentId,
  title,
  onNewTab,
}: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={(e) => e.stopPropagation()} //
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className="size-4 mr-2" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          Open New Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
