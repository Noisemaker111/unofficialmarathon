import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const tierListType = v.union(
  v.literal("weapons"),
  v.literal("runners"),
  v.literal("cosmetics"),
);

export const saveTierList = mutation({
  args: {
    code: v.string(),
    type: tierListType,
    payload: v.string(),
    label: v.optional(v.string()),
    ownerToken: v.optional(v.string()),
  },
  returns: v.id("tierLists"),
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("tierLists")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        type: args.type,
        payload: args.payload,
        label: args.label,
        ownerToken: args.ownerToken ?? existing.ownerToken,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("tierLists", {
      code: args.code,
      type: args.type,
      payload: args.payload,
      label: args.label,
      ownerToken: args.ownerToken,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getTierListByCode = query({
  args: { code: v.string() },
  returns: v.union(
    v.object({
      _id: v.id("tierLists"),
      _creationTime: v.number(),
      code: v.string(),
      type: tierListType,
      payload: v.string(),
      label: v.optional(v.string()),
      ownerToken: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tierLists")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();
  },
});

export const listRecentTierLists = query({
  args: {
    type: v.optional(tierListType),
    limit: v.optional(v.number()),
  },
  returns: v.array(
    v.object({
      _id: v.id("tierLists"),
      _creationTime: v.number(),
      code: v.string(),
      type: tierListType,
      payload: v.string(),
      label: v.optional(v.string()),
      ownerToken: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const limit = args.limit ?? 8;
    const all = await ctx.db.query("tierLists").collect();
    return all
      .filter((entry) => (args.type ? entry.type === args.type : true))
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, limit);
  },
});
