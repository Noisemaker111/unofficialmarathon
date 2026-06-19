import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveLoadout = mutation({
  args: {
    code: v.string(),
    payload: v.string(),
    label: v.optional(v.string()),
    runnerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("loadouts")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        payload: args.payload,
        label: args.label,
        runnerId: args.runnerId,
        createdAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("loadouts", {
      code: args.code,
      payload: args.payload,
      label: args.label,
      runnerId: args.runnerId,
      createdAt: Date.now(),
    });
  },
});

export const getLoadoutByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("loadouts")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .unique();
  },
});

export const listRecentLoadouts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 12;
    const all = await ctx.db.query("loadouts").collect();
    return all
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  },
});
