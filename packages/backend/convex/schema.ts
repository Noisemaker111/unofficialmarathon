import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    hostName: v.string(),
    activity: v.optional(v.string()),
    zones: v.optional(v.array(v.string())),
    runner: v.string(),
    teamSize: v.number(),
    maxTeam: v.number(),
    description: v.string(),
    status: v.union(v.literal("open"), v.literal("in_progress"), v.literal("completed")),
    level: v.string(),
    regions: v.optional(v.array(v.string())),
    platforms: v.optional(v.array(v.string())),
    kitRarities: v.optional(v.array(v.string())),
    playstyles: v.optional(v.array(v.string())),
    goals: v.optional(v.array(v.string())),
    playableShells: v.optional(v.array(v.string())),
    expiresAt: v.optional(v.number()),
    // Session token for local-first ownership (no auth)
    // If missing, the post is anonymous and cannot be edited/deleted by anyone
    ownerToken: v.optional(v.string()),
    // Legacy fields kept for backward compat with existing documents
    region: v.optional(v.string()),
    platform: v.optional(v.string()),
    kitRarity: v.optional(v.string()),
    lookingForShells: v.optional(v.array(v.string())),
    loadoutCode: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_status_and_activity", ["status", "activity"])
    .index("by_status_and_zone", ["status", "zones"])
    .index("by_status_and_level", ["status", "level"])
    .index("by_owner_token", ["ownerToken"]),

  sessionMembers: defineTable({
    sessionId: v.id("sessions"),
    runnerName: v.string(),
    runner: v.string(),
    // Track who joined by session token so they can leave their own joins
    joinerToken: v.optional(v.string()),
  })
    .index("by_session", ["sessionId"]),

  presence: defineTable({
    sessionId: v.id("sessions"),
    runnerName: v.string(),
    lastSeen: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_runner", ["runnerName"]),

  loadouts: defineTable({
    code: v.string(),
    label: v.optional(v.string()),
    runnerId: v.optional(v.string()),
    payload: v.string(),
    createdAt: v.number(),
  }).index("by_code", ["code"]),

  tierLists: defineTable({
    code: v.string(),
    type: v.union(v.literal("weapons"), v.literal("runners"), v.literal("cosmetics")),
    payload: v.string(),
    label: v.optional(v.string()),
    ownerToken: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_owner_token", ["ownerToken"]),

  liveStats: defineTable({
    key: v.string(),
    steamPlayers: v.optional(v.number()),
    steamPeak24h: v.optional(v.number()),
    twitchViewers: v.optional(v.number()),
    twitchChannels: v.optional(v.number()),
    season1Peak: v.optional(v.number()),
    serverSlamPeak: v.optional(v.number()),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});