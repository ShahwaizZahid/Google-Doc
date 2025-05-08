import { PaginationStatus, Preloaded } from "convex/react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { LucideIcon } from "lucide-react";

export type DocumentMenuProps = {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
};

export type DocumentRowProps = {
  document: Doc<"documents">;
};

export type DocumentsTablesProps = {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItem: number) => void;
  status: PaginationStatus;
};

export type AvatarProps = {
  src: string;
  name: string;
};

export type DocumentInputProps = {
  title: string;
  id: Id<"documents">;
};

export type DocumentProps = {
  preloadedDocument: Preloaded<typeof api.documents.getsByIdShareDocument>;
  sharetoken?: string;
  permission?: "read" | "edit" | null;
};

export type EditorProps = {
  initialContent?: string | undefined;
};

export type Navbarprops = {
  data: Doc<"documents">;
};

export type DocumentIdPageProps = {
  params: Promise<{ documentId: Id<"documents"> }>;
  searchParams?: Promise<{
    sharetoken?: string;
    permission?: "read" | "edit";
  }>;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  color: string;
};

export type MarkerProps = {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
};

export type ToolbarButtonProps = {
  onClick: () => void;
  icon: LucideIcon;
  isActive?: boolean;
};

export type OwnerValidateContextType = {
  showLoader: boolean;
  setShowLoader: (value: boolean) => void;
};

export type PermissionValidateContextType = {
  permission: "read" | "edit" | null;
  setPermission: (value: "read" | "edit" | null) => void;
  shareDocument: boolean;
  setShareDocument: (value: boolean) => void;
};

export type RemoveDialogProps = {
  documentId: Id<"documents">;
  children: React.ReactNode; // Corrected the prop name
};

export type RenameDialogProps = {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode; // Corrected the prop name
};
