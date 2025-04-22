"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { User } from "@/constants/types";
import { getUsers, getDocuments } from "./action";
import FullscreenLoader from "@/components/fullscreen-loader";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Id } from "../../../../convex/_generated/dataModel";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const searchParams = useSearchParams();

  const sharetoken = searchParams.get("sharetoken");
  const permission = searchParams.get("permission");

  const allowedPermissions = ["read", "edit", null];

  if (!allowedPermissions.includes(permission)) {
    throw new Error("Document not found");
  }

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room, sharetoken, permission }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => {
          return users.find((user) => user.id === userId) ?? undefined;
        });
      }}
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users; // Use let instead of const

        if (text) {
          filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filterUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Room loading...." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
