import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
// import { randomBytes } from "crypto";
export const getByIds = query({
  args: { ids: v.array(v.id("documents")) },
  handler: async (ctx, { ids }) => {
    const documents = [];

    for (const id of ids) {
      const document = await ctx.db.get(id);
      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: "[Removed]" });
      }
    }
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled document",
      initialContent: args.initialContent,
      ownerId: user.subject,
      organizationId,
    });
    return documentId;
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );
    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }

    console.log("ah....");
    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Unauthorized");
    }
    return await ctx.db.patch(args.id, { title: args.title });
  },
});

export const createShareLink = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    permission: v.union(v.literal("read"), v.literal("edit")), // Permission type
  },
  handler: async (ctx, { documentId, email, permission }) => {
    const user = await ctx.auth.getUserIdentity();

    // Check if the user is authenticated
    if (!user) {
      throw new Error(
        "Unauthorized: You must be logged in to share a document."
      );
    }

    // Fetch the document to ensure it exists and the user has access
    const document = await ctx.db.get(documentId);

    if (!document) {
      console.log("Document not foundas");
      throw new Error(
        "Document not found: The specified document does not exist."
      );
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember =
      document.organizationId &&
      document.organizationId === user.organization_id;

    if (!isOwner && !isOrganizationMember) {
      throw new Error(
        "Unauthorized: You do not have permission to share this document."
      );
    }

    const mockToken = "t" + Math.random().toString(36).substring(2, 15);
    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const createdAt = Date.now();
    const expiresAt = createdAt + SEVEN_DAYS_IN_MS;

    const existingShare = await ctx.db
      .query("documentShares")
      .withIndex("by_document_and_email", (q) =>
        q.eq("documentId", documentId).eq("email", email)
      )
      .first();

    if (existingShare) {
      console.log("existing document share found");
      if (existingShare.permission === permission) {
        console.log("existing document share found same permission");
        await ctx.db.patch(existingShare._id, {
          token: mockToken,
          expiresAt,
          createdAt,
        });
        return {
          message: "Share link updated with the same permission.",
          token: mockToken,
          shareId: existingShare._id,
          expiresAt,
        };
      } else if (existingShare.permission != permission) {
        console.log("existing document share found different permission");
        const newShareId = await ctx.db.insert("documentShares", {
          documentId,
          email,
          permission,
          token: mockToken,
          expiresAt,
          createdAt,
        });
        return {
          message: "New share link created with updated permission.",
          shareId: newShareId,
          token: mockToken,
          expiresAt,
        };
      }
    }
    console.log("new document share found");
    const newShareId = await ctx.db.insert("documentShares", {
      documentId,
      email,
      permission,
      token: mockToken,
      expiresAt,
      createdAt,
    });

    return {
      message: "New share link created.",
      shareId: newShareId,
      token: mockToken,
      expiresAt,
    };
  },
});

export const deleteExpiredShareLinks = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now(); // Current time

    // Use the new index 'by_expires_at' for a more efficient query
    const expiredLinks = await ctx.db
      .query("documentShares")
      .withIndex("by_expires_at", (q) => q.lt("expiresAt", now)) // Use index to filter by expiresAt
      .collect();

    // Delete expired links
    for (const link of expiredLinks) {
      await ctx.db.delete(link._id);
    }

    return {
      message: `${expiredLinks.length} expired share links deleted.`,
    };
  },
});

export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    const document = await ctx.db.get(id);

    return document;
  },
});

export const getsByIdShareDocument = query({
  args: {
    id: v.id("documents"),
    sharetoken: v.optional(v.string()), // Optional share token
    permission: v.optional(v.union(v.literal("read"), v.literal("edit"))), // Optional permission
  },
  handler: async (ctx, { id, sharetoken, permission }) => {
    const document = await ctx.db.get(id);

    if (!document) {
      throw new Error("Document not found");
    }

    if (sharetoken) {
      const shareLink = await ctx.db
        .query("documentShares")
        .withIndex("by_token", (q) => q.eq("token", sharetoken))
        .first();
      if (!shareLink) {
        throw new Error("Document not found");
      }

      if (shareLink.expiresAt < Date.now()) {
        throw new Error("Document not found");
      }

      if (shareLink.documentId !== id) {
        throw new Error("Document not found");
      }

      // If permission is provided, validate it
      if (permission && shareLink.permission !== permission) {
        throw new Error("Document not found");
      }
    }

    return document;
  },
});
