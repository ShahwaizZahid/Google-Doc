import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),

  documentShares: defineTable({
    documentId: v.id("documents"),
    email: v.string(),
    permission: v.union(v.literal("read"), v.literal("edit")),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_document_and_email", ["documentId", "email"])
    .index("by_document_id", ["documentId"])
    .index("by_email", ["email"])
    .index("by_token", ["token"]),
});
