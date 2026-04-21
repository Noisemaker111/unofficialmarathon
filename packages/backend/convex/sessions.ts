import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ---------- Queries ----------

/** List open sessions, optionally filtered by various criteria. */
export const listSessions = query({
  args: {
    status: v.optional(v.string()),
    activity: v.optional(v.string()),
    zone: v.optional(v.string()),
    level: v.optional(v.string()),
    region: v.optional(v.string()),
    goal: v.optional(v.string()),
    shell: v.optional(v.string()),
    platform: v.optional(v.string()),
    kitRarity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const status = (args.status ?? "open") as "open" | "in_progress" | "completed";

    const q = ctx.db.query("sessions").withIndex("by_status", (q) => q.eq("status", status));

    const sessions = await q.collect();

    // Filter in-memory for fields that aren't indexed
    // Also filter out expired sessions
    const now = Date.now();
    return sessions.filter((s) => {
      // Expire sessions past their expiresAt timestamp
      if (s.expiresAt !== undefined && s.expiresAt < now) return false;
      if (args.activity && s.activity !== args.activity) return false;
      if (args.zone && !(s.zones ?? []).includes(args.zone)) return false;
      if (args.level && s.level !== args.level) return false;
      // Array fields: match if session has no preference (empty) or includes the filter value
      if (args.region) {
        const regions = s.regions ?? [];
        if (regions.length > 0 && !regions.includes(args.region)) return false;
      }
      if (args.goal && !(s.goals ?? []).includes(args.goal)) return false;
      if (args.shell && !((s.playableShells ?? s.lookingForShells ?? [])).includes(args.shell)) return false;
      if (args.platform) {
        const platforms = s.platforms ?? [];
        if (platforms.length > 0 && !platforms.includes(args.platform)) return false;
      }
      if (args.kitRarity) {
        const kitRarities = s.kitRarities ?? [];
        if (kitRarities.length > 0 && !kitRarities.includes(args.kitRarity)) return false;
      }
      return true;
    });
  },
});

/** Get a single session by ID. */
export const getSession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

/** Get members of a session. */
export const getSessionMembers = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessionMembers")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

/** List sessions owned by a given session token. */
export const listMySessions = query({
  args: { ownerToken: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_owner_token", (q) => q.eq("ownerToken", args.ownerToken))
      .collect();
  },
});

// ---------- Mutations ----------

/** Create a new LFG session. */
export const createSession = mutation({
  args: {
    hostName: v.string(),
    activity: v.optional(v.string()),
    zones: v.optional(v.array(v.string())),
    runner: v.string(),
    maxTeam: v.number(),
    description: v.string(),
    level: v.string(),
    regions: v.optional(v.array(v.string())),
    platforms: v.optional(v.array(v.string())),
    kitRarities: v.optional(v.array(v.string())),
    playstyles: v.optional(v.array(v.string())),
    goals: v.optional(v.array(v.string())),
    playableShells: v.optional(v.array(v.string())),
    // Legacy field kept for backward compat
    lookingForShells: v.optional(v.array(v.string())),
    // Session token for ownership — allows edit/delete without auth
    ownerToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Sessions expire 10 minutes after creation
    const TEN_MINUTES_MS = 10 * 60 * 1000;
    const expiresAt = Date.now() + TEN_MINUTES_MS;

    const sessionId = await ctx.db.insert("sessions", {
      hostName: args.hostName,
      activity: args.activity,
      zones: args.zones,
      runner: args.runner,
      teamSize: 1,
      maxTeam: args.maxTeam,
      description: args.description,
      status: "open",
      level: args.level,
      regions: args.regions,
      platforms: args.platforms,
      kitRarities: args.kitRarities,
      playstyles: args.playstyles,
      goals: args.goals,
      // Use playableShells if provided, fall back to lookingForShells for compat
      playableShells: args.playableShells ?? args.lookingForShells,
      lookingForShells: args.lookingForShells ?? args.playableShells,
      expiresAt,
      ownerToken: args.ownerToken,
    });

    // Host is automatically the first member
    await ctx.db.insert("sessionMembers", {
      sessionId,
      runnerName: args.hostName,
      runner: args.runner,
      joinerToken: args.ownerToken,
    });

    return sessionId;
  },
});

/** Join an existing session. */
export const joinSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    runnerName: v.string(),
    runner: v.string(),
    joinerToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (session === null) {
      throw new Error("Session not found");
    }
    if (session.status !== "open") {
      throw new Error("Session is not open for joining");
    }
    if (session.teamSize >= session.maxTeam) {
      throw new Error("Session is full");
    }

    // Check if runner is already in the session
    const existing = await ctx.db
      .query("sessionMembers")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    if (existing.some((m) => m.runnerName === args.runnerName)) {
      throw new Error("Already in this session");
    }

    await ctx.db.insert("sessionMembers", {
      sessionId: args.sessionId,
      runnerName: args.runnerName,
      runner: args.runner,
      joinerToken: args.joinerToken,
    });

    const newTeamSize = session.teamSize + 1;

    // If team is now full, mark as in_progress
    const patch: { teamSize: number; status?: "open" | "in_progress" | "completed" } = { teamSize: newTeamSize };
    if (newTeamSize >= session.maxTeam) {
      patch.status = "in_progress";
    }

    await ctx.db.patch(args.sessionId, patch);

    return newTeamSize;
  },
});

/** Leave a session. If the host leaves, the session is completed. */
export const leaveSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    runnerName: v.string(),
    ownerToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (session === null) {
      throw new Error("Session not found");
    }

    // If host is leaving, complete the session
    if (session.hostName === args.runnerName) {
      await ctx.db.patch(args.sessionId, { status: "completed", teamSize: 0 });
      // Remove all members
      const members = await ctx.db
        .query("sessionMembers")
        .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
        .collect();
      for (const member of members) {
        await ctx.db.delete(member._id);
      }
      return null;
    }

    // Remove the member
    const members = await ctx.db
      .query("sessionMembers")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    const member = members.find((m) => m.runnerName === args.runnerName);
    if (member) {
      await ctx.db.delete(member._id);
    }

    // Decrement team size
    const newTeamSize = Math.max(0, session.teamSize - 1);
    await ctx.db.patch(args.sessionId, { teamSize: newTeamSize });

    // If session was in_progress and someone left, reopen it
    if (session.status === "in_progress" && newTeamSize < session.maxTeam) {
      await ctx.db.patch(args.sessionId, { status: "open" });
    }

    return newTeamSize;
  },
});

/** Delete a session. Only the owner (matching ownerToken) can delete. */
export const deleteSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    ownerToken: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (session === null) {
      throw new Error("Session not found");
    }
    if (session.ownerToken !== args.ownerToken) {
      throw new Error("Only the session owner can delete this post");
    }

    // Remove all members first
    const members = await ctx.db
      .query("sessionMembers")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    for (const member of members) {
      await ctx.db.delete(member._id);
    }

    // Remove presence records
    const presence = await ctx.db
      .query("presence")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    for (const p of presence) {
      await ctx.db.delete(p._id);
    }

    await ctx.db.delete(args.sessionId);
    return null;
  },
});

/** Update a session. Only the owner (matching ownerToken) can update. */
export const updateSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    ownerToken: v.string(),
    hostName: v.optional(v.string()),
    runner: v.optional(v.string()),
    level: v.optional(v.string()),
    maxTeam: v.optional(v.number()),
    description: v.optional(v.string()),
    zones: v.optional(v.array(v.string())),
    goals: v.optional(v.array(v.string())),
    playstyles: v.optional(v.array(v.string())),
    regions: v.optional(v.array(v.string())),
    platforms: v.optional(v.array(v.string())),
    kitRarities: v.optional(v.array(v.string())),
    playableShells: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { sessionId, ownerToken, ...updates } = args;
    const session = await ctx.db.get(sessionId);
    if (session === null) {
      throw new Error("Session not found");
    }
    if (session.ownerToken !== ownerToken) {
      throw new Error("Only the session owner can update this post");
    }

    // Build patch object, only including defined fields
    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(sessionId, patch);
    return null;
  },
});

/** Complete a session manually (host decides to end it). */
export const completeSession = mutation({
  args: {
    sessionId: v.id("sessions"),
    ownerToken: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (session === null) {
      throw new Error("Session not found");
    }
    // If ownerToken is provided, verify ownership
    if (args.ownerToken && session.ownerToken !== args.ownerToken) {
      throw new Error("Only the session owner can complete this post");
    }
    await ctx.db.patch(args.sessionId, { status: "completed" });
    return null;
  },
});