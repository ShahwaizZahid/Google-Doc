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
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export type EditorProps = {
  initialContent?: string | undefined;
};

export type Navbarprops = {
  data: Doc<"documents">;
};

export type DocumentIdPageProps = {
  params: Promise<{ documentId: Id<"documents"> }>;
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
